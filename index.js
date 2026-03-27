const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ───
app.use(cors());
app.use(express.json());

// ─── MongoDB connection (cached for serverless) ───
let cachedDb = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  
  // Set up connection options
  const opts = {
    bufferCommands: false, // Don't buffer commands if connection drops
  };

  try {
    cachedDb = mongoose.connect(process.env.MONGO_URI, opts);
    await cachedDb;
    console.log('⚡ MongoDB connected');
  } catch (err) {
    cachedDb = null; // Reset on failure so next request can retry
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
  return cachedDb;
}

// Connect to DB before every request (for Vercel serverless)
app.use(async (req, res, next) => {
  try {
    // Only connect if not a health check to avoid overhead (optional)
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

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

// ─── Start locally (not on Vercel) ───
const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🔥 Vajra server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to start server locally:', err.message);
    process.exit(1);
  });
}

module.exports = app;
