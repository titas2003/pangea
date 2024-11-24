const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../services/emailService');
const { JWT_SECRET } = require('../config/env');

exports.signUp = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validate inputs
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate verification token
        const verificationToken = jwt.sign(
            { id: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send verification email
        const verificationUrl = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;
        const emailHtml = `
            <h1>Welcome to Pangea</h1>
            <p>Hi ${name},</p>
            <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}">Verify your mail here!</a>
            <hr/><br>
            <p>Thanks and Regards,</p>
            <p><b>Titas</b></p>
        `;
        await sendEmail(email, 'Verify Your Email', emailHtml);

        return res.status(201).json({
            message: 'User registered successfully. A verification email has been sent.',
            token: verificationToken
        });
    } catch (error) {
        console.error('Error in signUp:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: 'Invalid or missing token' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mark the user as verified
        user.isVerified = true;
        await user.save();
        console.log(`${user} verified successfully!!`)
        return res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error('Error in verifyEmail:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};
