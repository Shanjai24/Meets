require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
require('./config/passport'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// CORS first
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['set-cookie']
}));

// Then other middleware
app.use(express.json());

// Set Base URL
app.use('/api', (req, res, next) => {
    req.baseUrl = 'http://localhost:5173';
    next();
});

// Passport Middleware
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes); // Auth Routes
app.use('/api/reports', reportRoutes); // Report Routes

// OAuth Error Handling
app.use('/auth/*', (err, req, res, next) => {
    console.error('Auth Error:', err);
    if (err.status === 400) {
        return res.status(400).json({
            success: false,
            message: err.message || 'Invalid credentials'
        });
    }
    res.redirect(`${process.env.CLIENT_URL}/login?error=${err.message}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Server error'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});