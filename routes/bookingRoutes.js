// Import Express and create router instance
const express = require('express');
const router = express.Router();

// Import booking controller functions
const {
    createBooking,
    getUserDashboard,
    cancelBooking,
    getAdminDashboard
} = require('../controllers/bookingController');

// Import authentication and authorization middleware
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Route to display logged-in user's booking dashboard
router.get('/dashboard', isAuthenticated, getUserDashboard);

// Route to book tickets for a specific event
router.post('/:eventId', isAuthenticated, createBooking);

// Route to cancel a specific booking
router.post('/:id/cancel', isAuthenticated, cancelBooking);

// Route to display admin dashboard with all bookings and analytics
router.get('/admin', isAuthenticated, isAdmin, getAdminDashboard);

// Export router for use in app.js
module.exports = router;