// Import required packages
const express = require('express');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Import MongoDB connection function
const connectDB = require('./config/db');

// Import session package for login persistence
const session = require('express-session');

// Import authentication routes
const authRoutes = require('./routes/authRoutes');

// Import event routes
const eventRoutes = require('./routes/eventRoutes');

// Import booking routes
const bookingRoutes = require('./routes/bookingRoutes');

// Import enquiry routes
const enquiryRoutes = require('./routes/enquiryRoutes');

// Import admin routes
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express application
const app = express();

// Connect application to MongoDB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON requests
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Setup session handling for authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Use authentication routes
app.use('/', authRoutes);

// Enable event routes
app.use('/events', eventRoutes);

// Enable booking routes
app.use('/bookings', bookingRoutes);

// Enable enquiry routes
app.use('/', enquiryRoutes);

// Enable admin routes
app.use('/', adminRoutes);

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

