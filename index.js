const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use caching to connect only once during local development
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to MongoDB.');
            return;
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            cache: true
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('MongoDB connection failed');
    }
};

module.exports = connectDB;