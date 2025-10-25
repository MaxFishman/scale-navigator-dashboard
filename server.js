const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4242;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Scale Navigator API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
