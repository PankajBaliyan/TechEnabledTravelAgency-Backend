// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    //if your username will be email, then you need to modify the passportConfig setup
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
