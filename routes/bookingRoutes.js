//Import Event Model
const Event = require('../models/Event');

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

// Show booking form for a specific event
router.get('/:eventId', isAuthenticated, async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).render('error', { message: 'Event not found' });

        res.render('bookings/book', {
            event,
            user: req.session,
            error: req.query.error || null
        });
    } catch (err) {
        res.status(500).render('error', { message: 'Could not load booking page' });
    }
});

// Export router for use in app.js
module.exports = router;