/**
 * config.js
 * App Configuration for Date Invitation
 * 
 * You can set your Telegram Bot Token & Chat ID here, OR
 * set them as environment variables in Vercel:
 * - TELEGRAM_BOT_TOKEN
 * - TELEGRAM_CHAT_ID
 */

window.APP_CONFIG = {
  // If deploying as static without serverless functions, you can paste them here:
  // (Or leave empty and set them in Vercel Environment Variables)
  TELEGRAM_BOT_TOKEN: "", 
  TELEGRAM_CHAT_ID: "",

  // Your name and Facebook profile
  SENDER_NAME: "Thành",
  FACEBOOK_URL: "https://www.facebook.com/be.hoangtu.606/",
  PARTNER_NAME: "My Favorite Person",

  // Funny progressive texts on the "No" button
  DODGE_TEXTS: [
    "No",
    "Sure?",
    "Think again!",
    "Really? 🥺",
    "Are you positive?",
    "Last chance!",
    "Can't catch me 😜",
    "Try clicking YES! ✨"
  ],

  // Subtitle phrases based on dodge count
  SUBTITLE_PHRASES: [
    "Catch No if you can.",
    "Nice try — it dodged you.",
    "Whoops, almost had it!",
    "Resistance is futile 💕",
    "Yes is blooming, hm? 🌸",
    "Look how big YES is getting!",
    "You know you want to say YES! 🥰"
  ]
};
