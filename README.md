# SoulDesign Photography Website

Static frontend with an Express backend to accept bookings (CSV export + optional email notifications).

## Quickstart

1. Install Node.js 18+.
2. In this folder, run:

```
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment (optional)

Create a `.env` file to enable booking email notifications:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=you@example.com
SMTP_PASS=your_app_password
SMTP_FROM=SoulDesign <you@example.com>
BOOKINGS_TO=bookings@example.com
```

If `.env` is not provided, bookings will still be saved to `bookings.csv`.

## Scripts

- `npm start` — start server
- `npm run dev` — start with nodemon (auto-restart on changes)

## Structure

- `public/` — static site (HTML/CSS/JS)
- `server.js` — Express server + booking API
- `bookings.csv` — appended per booking (created automatically)





