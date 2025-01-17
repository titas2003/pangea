const express = require('express');
const { signUp, verifyEmail, signIn } = require('../../controllers/customer/authController');

const router = express.Router();

// Sign-Up Route
router.post('/signup', signUp);

// Email Verification Route
router.get('/verify-email', verifyEmail);

router.post('/signin', signIn);

module.exports = router;
