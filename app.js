// Import required packages
const express = require('express');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Import MongoDB connection function
const connectDB = require('./config/db');

// Initialize Express application
const app = express();

// Connect application to MongoDB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {

    // Render homepage view
    res.render('index');
});

// Set application port
const PORT = process.env.PORT || 3000;

// Start Express server
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});

