const mongoose = require('mongoose');

const URI = process.env.URI;

// Connect to MongoDB
exports.connectMongoose = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
