const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ───
app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ───
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return; // Already connecting or connected
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('⚡ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw new Error('Database connection failed');
    }
};

// ─── Routes ───
app.use('/api/auth', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
}, require('./routes/auth'));

app.use('/api/passes', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
}, require('./routes/passes'));

app.use('/api/classes', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
}, require('./routes/classes'));

app.use('/api/bookings', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
}, require('./routes/bookings'));

app.use('/api/members', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
}, require('./routes/members'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'VAJRA SYSTEMS OPERATIONAL', timestamp: new Date() });
});

// Root route to prevent 404 on base URL
app.get('/', (req, res) => {
    res.send('Vajra Gym Backend API is running. Access endpoints at /api/*');
});

// ─── Error handler ───
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start local server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(PORT, () => {
             console.log(`🔥 Vajra server running on port ${PORT}`);
        });
    }).catch(err => {
        console.error('Local server failed to start:', err.message);
    });
}

// Export the Express API for Vercel Serverless Functions
module.exports = app;
