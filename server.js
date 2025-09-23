const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Compression middleware for better performance
const compression = require('compression');
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Ensure bookings file exists with header
const bookingsFilePath = path.join(__dirname, 'bookings.csv');
function ensureBookingsFile() {
  if (!fs.existsSync(bookingsFilePath)) {
    const header = 'timestamp,name,email,phone,event_date,service,message' + "\n";
    fs.writeFileSync(bookingsFilePath, header, 'utf8');
  }
}
ensureBookingsFile();

// Email transporter (optional; configured via .env)
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE || '').toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, eventDate, service, message } = req.body || {};

    if (!name || !email || !eventDate || !service) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const timestamp = new Date().toISOString();
    const sanitized = [timestamp, name, email, phone || '', eventDate, service, (message || '').replace(/\n|\r/g, ' ')].map((v) => {
      const s = String(v).trim();
      if (s.includes(',') || s.includes('"')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    });

    // Append to CSV
    fs.appendFileSync(bookingsFilePath, sanitized.join(',') + "\n", 'utf8');

    // Send email notification if configured
    const transporter = createTransporter();
    if (transporter) {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.BOOKINGS_TO || process.env.SMTP_USER,
        subject: `New Booking: ${name} - ${service}`,
        text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nEvent Date: ${eventDate}\nService: ${service}\n\nMessage:\n${message || '-'}\n\nTimestamp: ${timestamp}`
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        console.warn('Email send failed:', emailErr.message);
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Fallback to index.html for root
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


