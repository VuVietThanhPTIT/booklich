/**
 * api/notify.js
 * Vercel Serverless Function
 * Securely sends Telegram notifications without exposing your bot token in frontend code!
 */

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(200).json({ 
      success: false, 
      warning: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variable is not set.' 
    });
  }

  const { message, date, time, activities, notes, dodges } = req.body || {};

  const textToSend = message || (
    `💌 *NEW DATE NIGHT CONFIRMED!* 💌\n\n` +
    `📅 *Date:* \`${date}\`\n` +
    `⏰ *Time:* \`${time}\`\n` +
    `🎯 *Plan:* ${(activities || []).join(', ')}\n` +
    (notes ? `💭 *Special Request:* _"${notes}"_\n` : '') +
    `⚡ *Dodges:* ${dodges || 0} tries!\n\n` +
    `🎉 _Sent with love from your Date Invitation App_ ✨`
  );

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: textToSend,
        parse_mode: 'Markdown'
      })
    });

    const telegramData = await telegramRes.json();

    if (telegramData.ok) {
      return res.status(200).json({ success: true, message: 'Notification delivered' });
    } else {
      return res.status(502).json({ success: false, error: telegramData.description });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
