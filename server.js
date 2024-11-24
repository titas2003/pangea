const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { PORT } = require('./config/env');

// Initialize the app
const app = express();
app.use(express.json());

connectDB();

// Define a basic route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running successfully!',
        status: 'success',
    });
});

app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
