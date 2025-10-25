const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Scale Navigator API is running' });
});

// Export the app for Vercel
module.exports = app;
