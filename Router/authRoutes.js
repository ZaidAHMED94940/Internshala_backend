// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController.js');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', login);

module.exports = router;
