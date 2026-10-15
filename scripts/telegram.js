/**
 * telegram.js
 * Handles sending date reservation details to Telegram Bot
 */

class TelegramDispatcher {
  static async sendNotification(data) {
    const { date, time, activities, notes, dodges } = data;
    
    // Format message
    const message = (
      `💌 *NEW DATE NIGHT CONFIRMED!* 💌\n\n` +
      `📅 *Date:* \`${date}\`\n` +
      `⏰ *Time:* \`${time}\`\n` +
      `🎯 *Plan:* ${activities.join(', ')}\n` +
      (notes ? `💭 *Special Request:* _"${notes}"_\n` : '') +
      `⚡ *Dodges:* ${dodges} tries!\n\n` +
      `🎉 _Sent with love from your Date Invitation App_ ✨`
    );

    // 1. First attempt: call Vercel Serverless Function `/api/notify`
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, ...data })
      });

      if (response.ok) {
        return { success: true, method: 'serverless' };
      }
    } catch (err) {
      // Serverless not available (e.g. running on static server or GitHub Pages)
    }

    // 2. Fallback: Direct Client Telegram API (if configured in scripts/config.js)
    const config = window.APP_CONFIG || {};
    const botToken = config.TELEGRAM_BOT_TOKEN;
    const chatId = config.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
          })
        });

        if (res.ok) {
          return { success: true, method: 'client-direct' };
        }
      } catch (clientErr) {
        console.warn('Direct Telegram API failed:', clientErr);
      }
    }

    // 3. Fallback: Save in localStorage
    localStorage.setItem('last_date_plan', JSON.stringify({ ...data, timestamp: new Date().toISOString() }));
    return { success: false, reason: 'unconfigured_or_offline' };
  }
}

window.TelegramDispatcher = TelegramDispatcher;
