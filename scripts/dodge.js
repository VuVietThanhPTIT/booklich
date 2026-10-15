/**
 * dodge.js
 * Physics and interaction for the elusive "No" button:
 * Dodges smoothly on BOTH mouse hover (mouseenter/mouseover) AND mobile touch/click (touchstart/pointerdown/click)!
 */

class DodgeController {
  constructor() {
    this.btnNo = document.getElementById('btnNo');
    this.btnNoText = document.getElementById('btnNoText');
    this.btnYes = document.getElementById('btnYes');
    this.card = document.getElementById('invitationCard');
    this.actionsArena = document.getElementById('actionsArena');
    this.counterEl = document.getElementById('dodgeCounter');
    this.countNumEl = document.getElementById('dodgeCountNum');
    this.countLabelEl = document.getElementById('dodgeLabel');
    this.subtitleEl = document.getElementById('dynamicSubtitle');

    this.dodgeCount = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.lastDodgeTime = 0;

    this.init();
  }

  init() {
    if (!this.btnNo || !this.card) return;

    const handleTrigger = (e) => {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      this.handleDodge(e);
    };

    // 1. Desktop Mouse Hover & Click
    this.btnNo.addEventListener('mouseenter', handleTrigger);
    this.btnNo.addEventListener('mouseover', handleTrigger);
    this.btnNo.addEventListener('click', handleTrigger);

    // 2. Mobile Touch & Pointer
    this.btnNo.addEventListener('touchstart', handleTrigger, { passive: false });
    this.btnNo.addEventListener('pointerdown', handleTrigger);
  }

  handleDodge(e) {
    // Cooldown check (80ms to debounce multiple events on the same tap/hover)
    const now = Date.now();
    if (now - this.lastDodgeTime < 80) return;
    this.lastDodgeTime = now;

    // Play cute sound
    if (window.soundFx) {
      window.soundFx.playPop();
    }

    this.dodgeCount++;

    // Update Counter UI
    this.updateCounter();

    // Update Text & Subtitle
    this.updateTexts();

    // Grow YES button
    this.growYesButton();

    // Trigger Flower Bloom
    if (window.flowerManager) {
      window.flowerManager.updateBloom(this.dodgeCount);
    }

    // Move No button to random safe position
    this.relocateNoButton();
  }

  updateCounter() {
    if (!this.counterEl || !this.countNumEl) return;

    this.counterEl.classList.add('visible');
    this.counterEl.classList.remove('pop');
    void this.counterEl.offsetWidth; // Trigger reflow for CSS animation
    this.counterEl.classList.add('pop');

    this.countNumEl.textContent = this.dodgeCount;
    this.countLabelEl.textContent = this.dodgeCount === 1 ? 'dodge' : 'dodges';
  }

  updateTexts() {
    const config = window.APP_CONFIG || {};
    const dodgeTexts = config.DODGE_TEXTS || ["No", "Sure?", "Think again!", "Last chance!"];
    const subtitlePhrases = config.SUBTITLE_PHRASES || ["Catch No if you can.", "Nice try — it dodged you."];

    // Change No button text
    if (this.btnNoText) {
      const textIndex = Math.min(this.dodgeCount, dodgeTexts.length - 1);
      this.btnNoText.textContent = dodgeTexts[textIndex];
    }

    // Change Subtitle
    if (this.subtitleEl) {
      const phraseIndex = Math.min(this.dodgeCount, subtitlePhrases.length - 1);
      this.subtitleEl.textContent = subtitlePhrases[phraseIndex];

      if (this.dodgeCount >= 4) {
        this.subtitleEl.classList.add('bloom-hint');
      }
    }
  }

  growYesButton() {
    if (!this.btnYes) return;

    // Scale YES button progressively (capped at 1.45x)
    const scale = Math.min(1 + this.dodgeCount * 0.08, 1.45);
    this.btnYes.style.transform = `scale(${scale})`;
    this.btnYes.classList.add('pulse');
  }

  relocateNoButton() {
    if (!this.btnNo || !this.card) return;

    // Move btnNo directly into card container so position: absolute is 100% relative to card
    if (this.btnNo.parentElement !== this.card) {
      this.card.appendChild(this.btnNo);
    }

    this.btnNo.classList.add('dodging');
    this.btnNo.classList.remove('wobble');
    void this.btnNo.offsetWidth;
    this.btnNo.classList.add('wobble');

    // Get card boundaries
    const cardRect = this.card.getBoundingClientRect();
    const btnRect = this.btnNo.getBoundingClientRect();

    // Safe padding inside card
    const padding = 20;
    const minX = padding;
    const maxX = Math.max(minX + 20, cardRect.width - btnRect.width - padding);

    // Safe Y range: lower portion of the card around and below the YES button
    const minY = Math.max(cardRect.height * 0.62, cardRect.height - 120);
    const maxY = Math.max(minY + 10, cardRect.height - btnRect.height - 18);

    // Calculate a position noticeably different from the last position
    let newX, newY;
    let attempts = 0;

    do {
      newX = Math.floor(minX + Math.random() * (maxX - minX));
      newY = Math.floor(minY + Math.random() * (maxY - minY));
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(newX - this.lastX) < 45
    );

    this.lastX = newX;
    this.lastY = newY;

    // Position relative to the card container
    this.btnNo.style.position = 'absolute';
    this.btnNo.style.left = `${newX}px`;
    this.btnNo.style.top = `${newY}px`;
    this.btnNo.style.margin = '0';
  }

  getDodges() {
    return this.dodgeCount;
  }
}

window.dodgeController = null;
