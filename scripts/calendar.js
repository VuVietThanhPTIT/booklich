/**
 * calendar.js
 * Generates Google Calendar links and formatted date summaries
 */

class CalendarHelper {
  // Generate a direct Google Calendar add event URL
  static createGoogleCalendarUrl({ date, time, activities, notes }) {
    try {
      // Parse date and time: date format 'YYYY-MM-DD', time format 'HH:mm'
      const startDateTime = new Date(`${date}T${time}:00`);
      
      // Default duration: 3 hours
      const endDateTime = new Date(startDateTime.getTime() + 3 * 60 * 60 * 1000);

      const formatIsoTime = (d) => {
        return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
      };

      const startIso = formatIsoTime(startDateTime);
      const endIso = formatIsoTime(endDateTime);

      const title = encodeURIComponent("Đi chơi với Thành 💖");
      const details = encodeURIComponent(
        `Kế hoạch đi chơi cùng Thành nè! ✨\n\n` +
        `🎯 Hoạt động: ${activities.join(', ')}\n` +
        (notes ? `💭 Ghi chú: ${notes}\n` : '') +
        `\nĐã chốt lịch hẹn hò!`
      );
      const location = encodeURIComponent(activities.join(', '));

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
    } catch (e) {
      console.error('Error generating Google Calendar URL:', e);
      return 'https://calendar.google.com';
    }
  }

  // Format readable Date string (e.g., "Friday, Oct 24")
  static formatDisplayDate(dateStr) {
    if (!dateStr) return 'Someday Soon';
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  // Format readable Time string (e.g., "07:00 PM")
  static formatDisplayTime(timeStr) {
    if (!timeStr) return '07:00 PM';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 || 12;
      return `${formattedH}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  }

  // Generate pretty text for sharing
  static generateShareSummary({ date, time, activities, notes, dodges }) {
    const displayDate = this.formatDisplayDate(date);
    const displayTime = this.formatDisplayTime(time);
    
    return (
      `💖 OFFICIAL DATE CONFIRMED! 💖\n\n` +
      `📅 Date: ${displayDate}\n` +
      `⏰ Time: ${displayTime}\n` +
      `🎯 Plan: ${activities.join(', ')}\n` +
      (notes ? `💭 Note: "${notes}"\n` : '') +
      `⚡ Dodges: ${dodges} tries (I knew you'd say YES! 🥰)\n\n` +
      `Can't wait for our date night! ✨`
    );
  }
}

window.CalendarHelper = CalendarHelper;
