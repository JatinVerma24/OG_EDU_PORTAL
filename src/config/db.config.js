const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ogedu_portal';

let connectionPromise = null;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    
    if (mongoose.connection.readyState === 2) {
        if (connectionPromise) {
            await connectionPromise;
            return mongoose.connection;
        }
    }

    console.log('Initiating MongoDB connection with pooling...');
    
    // Modern MongoDB driver configuration
    const options = {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        minPoolSize: 2,   // Keep at least 2 socket connections alive
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000,        // Close inactive sockets after 45s
    };

    connectionPromise = mongoose.connect(MONGO_URI, options);
    
    try {
        await connectionPromise;
        console.log('Connected to MongoDB Atlas successfully.');
    } catch (err) {
        console.error('MongoDB Atlas connection error:', err.message);
        connectionPromise = null;
        throw err;
    }
    
    return mongoose.connection;
}

module.exports = {
    connectDB,
    MONGO_URI
};
