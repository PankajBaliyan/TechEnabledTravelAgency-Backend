// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
//add route to get user details
router.get('/logout', authController.logout);

module.exports = router;
