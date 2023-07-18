// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register user
router.post('/register', authController.register);
// Login user
router.post('/login', authController.login);
// Get user details
router.get('/getUserDetails/:id', authController.getUserDetails);
// Delete user
router.get('/logout', authController.logout);
// Update user password
router.patch('/updatePassword/:id', authController.updatePassword);

module.exports = router;
