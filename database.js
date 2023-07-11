const mongoose = require('mongoose');

// require('dotenv').config();
const URI = process.env.URI;

// Connect to MongoDB
exports.connectMongoose = () => {
    mongoose
        .connect(URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(() => {
            console.log('Connection failed');
        });
};

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
});
exports.User = mongoose.model('User', userSchema);
