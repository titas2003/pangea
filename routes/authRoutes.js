const express = require('express');
const { signUp, verifyEmail } = require('../controllers/authController');

const router = express.Router();

// Sign-Up Route
router.post('/signup', signUp);

// Email Verification Route
router.get('/verify-email', verifyEmail);

module.exports = router;
