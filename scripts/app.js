/**
 * app.js
 * Master Application Coordinator
 * Handles screen transitions, state management, and user interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Screen Elements
  const screens = {
    ask: document.getElementById('screenAsk'),
    celebration: document.getElementById('screenCelebration'),
    plan: document.getElementById('screenPlan'),
    ticket: document.getElementById('screenTicket')
  };

  // Buttons & Controls
  const btnYes = document.getElementById('btnYes');
  const btnGoToPlan = document.getElementById('btnGoToPlan');
  const datePlanForm = document.getElementById('datePlanForm');
  const inputDate = document.getElementById('inputDate');
  const inputTime = document.getElementById('inputTime');
  const inputNotes = document.getElementById('inputNotes');
  const btnSubmitPlan = document.getElementById('btnSubmitPlan');
  const btnSubmitPlanText = document.getElementById('btnSubmitPlanText');
  const submitSpinner = document.getElementById('submitSpinner');
  const planChipsGrid = document.getElementById('planChipsGrid');
  const btnShareTicket = document.getElementById('btnShareTicket');
  const btnGoogleCalendar = document.getElementById('btnGoogleCalendar');
  const telegramStatusNotice = document.getElementById('telegramStatusNotice');

  // Initialize Dodge Controller
  window.dodgeController = new DodgeController();

  // Set default minimum date (today) and default value (tomorrow)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDateYMD = (d) => d.toISOString().split('T')[0];
  if (inputDate) {
    inputDate.min = formatDateYMD(today);
    inputDate.value = formatDateYMD(tomorrow);
  }

  // Activity Chip Selection
  if (planChipsGrid) {
    planChipsGrid.addEventListener('click', (e) => {
      const chip = e.target.closest('.plan-chip');
      if (!chip) return;

      chip.classList.toggle('selected');
      if (window.soundFx) window.soundFx.playTick();
    });
  }

  // Switch Active Screen Helper
  const showScreen = (targetKey) => {
    Object.values(screens).forEach((screen) => {
      if (screen) {
        screen.classList.remove('active');
        screen.style.display = 'none';
      }
    });

    const target = screens[targetKey];
    if (target) {
      target.style.display = 'block';
      // Force reflow for smooth animation
      void target.offsetWidth;
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==========================================
  // EVENT: USER CLICKS "YES" (Screen 1 -> Screen 2)
  // ==========================================
  if (btnYes) {
    btnYes.addEventListener('click', () => {
      // Sound & Confetti
      if (window.soundFx) window.soundFx.playSuccess();
      if (window.celebrationManager) window.celebrationManager.fireCelebration();

      // Transition to Celebration screen
      setTimeout(() => {
        showScreen('celebration');
      }, 200);
    });
  }

  // ==========================================
  // EVENT: "Now let's plan it" (Screen 2 -> Screen 3)
  // ==========================================
  if (btnGoToPlan) {
    btnGoToPlan.addEventListener('click', () => {
      if (window.soundFx) window.soundFx.playTick();
      showScreen('plan');
    });
  }

  // ==========================================
  // EVENT: SUBMIT DATE PLAN (Screen 3 -> Screen 4)
  // ==========================================
  if (datePlanForm) {
    datePlanForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect selected activities
      const selectedChips = Array.from(
        document.querySelectorAll('.plan-chip.selected')
      ).map((chip) => chip.dataset.value);

      if (selectedChips.length === 0) {
        alert('Please choose at least one fun activity for our date! 🌸');
        return;
      }

      const dateVal = inputDate.value;
      const timeVal = inputTime.value || '19:00';
      const notesVal = inputNotes.value.trim();
      const dodgesCount = window.dodgeController ? window.dodgeController.getDodges() : 0;

      // Loading UI State
      if (btnSubmitPlan) btnSubmitPlan.disabled = true;
      if (btnSubmitPlanText) btnSubmitPlanText.textContent = 'Locking it in...';
      if (submitSpinner) submitSpinner.classList.remove('hidden');

      const planData = {
        date: dateVal,
        time: timeVal,
        activities: selectedChips,
        notes: notesVal,
        dodges: dodgesCount
      };

      // Send to Telegram Bot in background
      let notifyResult = { success: false };
      try {
        notifyResult = await TelegramDispatcher.sendNotification(planData);
      } catch (err) {
        console.warn('Dispatch note:', err);
      }

      // Populate Screen 4: Date Ticket UI
      populateTicket(planData);

      // Reset button state
      if (btnSubmitPlan) btnSubmitPlan.disabled = false;
      if (btnSubmitPlanText) btnSubmitPlanText.textContent = 'Lock in the date & plan ✍️';
      if (submitSpinner) submitSpinner.classList.add('hidden');

      // Show Status notice
      if (telegramStatusNotice) {
        if (notifyResult.success) {
          telegramStatusNotice.textContent = '✨ Notification sent directly to Thành!';
          telegramStatusNotice.className = 'telegram-status success';
        } else {
          telegramStatusNotice.textContent = '💌 Saved! Ready for our special day.';
          telegramStatusNotice.className = 'telegram-status';
        }
      }

      // Celebration on Screen 4
      if (window.soundFx) window.soundFx.playSuccess();
      if (window.celebrationManager) window.celebrationManager.fireCelebration();

      // Transition to Ticket Screen
      showScreen('ticket');
    });
  }

  // Populate Date Ticket Details
  function populateTicket(data) {
    const { date, time, activities, notes, dodges } = data;

    const ticketDateDisplay = document.getElementById('ticketDateDisplay');
    const ticketTimeDisplay = document.getElementById('ticketTimeDisplay');
    const ticketActivitiesDisplay = document.getElementById('ticketActivitiesDisplay');
    const ticketNotesDisplay = document.getElementById('ticketNotesDisplay');
    const ticketNotesRow = document.getElementById('ticketNotesRow');
    const ticketDodgeStat = document.getElementById('ticketDodgeStat');

    if (ticketDateDisplay) {
      ticketDateDisplay.textContent = CalendarHelper.formatDisplayDate(date);
    }

    if (ticketTimeDisplay) {
      ticketTimeDisplay.textContent = CalendarHelper.formatDisplayTime(time);
    }

    if (ticketActivitiesDisplay) {
      ticketActivitiesDisplay.innerHTML = activities
        .map((act) => `<span class="t-tag">${act}</span>`)
        .join('');
    }

    if (ticketNotesDisplay && ticketNotesRow) {
      if (notes) {
        ticketNotesRow.style.display = 'flex';
        ticketNotesDisplay.textContent = `"${notes}"`;
      } else {
        ticketNotesRow.style.display = 'none';
      }
    }

    if (ticketDodgeStat) {
      if (dodges === 0) {
        ticketDodgeStat.textContent = '💖 0 dodges — instant chemistry & zero hesitation!';
      } else {
        ticketDodgeStat.textContent = `💖 Dodged ${dodges} ${dodges === 1 ? 'time' : 'times'} — worth the wait!`;
      }
    }

    // Google Calendar URL
    if (btnGoogleCalendar) {
      const calUrl = CalendarHelper.createGoogleCalendarUrl(data);
      btnGoogleCalendar.href = calUrl;
    }

    // Share / Facebook Link Button
    if (btnShareTicket) {
      btnShareTicket.onclick = async () => {
        const shareText = CalendarHelper.generateShareSummary(data);

        // Copy ticket details to clipboard so she can just paste it directly
        try {
          await navigator.clipboard.writeText(shareText);
        } catch (e) {
          // Clipboard fallback
        }

        const originalText = btnShareTicket.innerHTML;
        btnShareTicket.innerHTML = '<span>✅ Đã copy vé! Đang mở Facebook của Thành...</span>';
        setTimeout(() => {
          btnShareTicket.innerHTML = originalText;
        }, 3000);
      };
    }
  }
});
