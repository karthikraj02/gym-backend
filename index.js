const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ───
app.use(cors());
app.use(express.json());

// ─── Routes ───
app.use('/api/auth', require('./routes/auth'));
app.use('/api/passes', require('./routes/passes'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/members', require('./routes/members'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'VAJRA SYSTEMS OPERATIONAL', timestamp: new Date() });
});

// ─── Error handler ───
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ─── Connect DB & Start ───
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('⚡ MongoDB connected');
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🔥 Vajra server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;

