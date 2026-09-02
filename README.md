# Telegram Birthday Mini App — Vercel Ready 💗

A clean React + Vite frontend designed to run as a Telegram Mini App.

## Deploy on Vercel

1. Upload this project to GitHub.
2. In Vercel, import the GitHub repository.
3. Vercel should detect Vite automatically.
4. Build command:
   `npm run build`
5. Output directory:
   `dist`
6. Deploy.

No server, database, Express, or environment variables are required for this frontend.

## Connect to Telegram

After Vercel gives you an HTTPS URL:

1. Open @BotFather in Telegram.
2. Select your bot.
3. Configure its Main Mini App.
4. Use your Vercel URL.

You can also create a bot menu button or an inline `web_app` button that opens the same URL.

## Local testing

```bash
npm install
npm run dev
```

For Telegram testing, use the deployed HTTPS Vercel URL.

## Customize

Edit `src/App.jsx` to change:
- birthday name
- gift titles
- messages
- gift emojis

Edit `src/App.css` for the design.

The app already detects the Telegram user's first name when opened inside Telegram and uses Telegram haptic feedback when available.
