// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    // Send the index.html file when someone visits the root URL
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`TapTracker server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} in your browser`);
});