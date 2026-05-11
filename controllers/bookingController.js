// Import Booking model
const Booking = require('../models/Booking');

// Import Event model
const Event = require('../models/Event');

// Handle ticket booking for a specific event
const createBooking = async (req, res) => {
    try {

        // Extract ticket quantity from form submission
        const { ticketQuantity } = req.body;

        // Find the event by ID from URL parameter
        const event = await Event.findById(req.params.eventId);

        // Return error if event does not exist
        if (!event) {
            return res.status(404).render('error', { message: 'Event not found' });
        }

        // Check if requested tickets exceed available capacity
        if (ticketQuantity > event.availableTickets) {
            return res.redirect(`/events/${req.params.eventId}?error=Not enough tickets available`);
        }

        // Calculate total price based on quantity and event ticket price
        const totalPrice = ticketQuantity * event.ticketPrice;

        // Create and save new booking to database
        const booking = await Booking.create({
            user: req.session.userId,
            event: event._id,
            ticketQuantity,
            totalPrice,
            status: 'Confirmed'
        });

        // Deduct booked tickets from event available capacity
        event.availableTickets -= ticketQuantity;

        // Save updated event capacity to database
        await event.save();

        // Redirect user to dashboard with success message
        res.redirect('/bookings/dashboard?success=Booking confirmed');

    } catch (err) {

        // Log error to console for debugging
        console.error(err);

        // Render error page if booking fails
        res.status(500).render('error', { message: 'Booking failed' });
    }
};

// Retrieve and display all bookings for the logged-in user
const getUserDashboard = async (req, res) => {
    try {

        // Fetch all bookings belonging to the current session user
        const bookings = await Booking.find({ user: req.session.userId })
            .populate('event')
            .sort({ createdAt: -1 });

        // Render user dashboard with booking data
        res.render('bookings/dashboard', { bookings });

    } catch (err) {

        // Log error to console for debugging
        console.error(err);

        // Render error page if dashboard fails to load
        res.status(500).render('error', { message: 'Could not load dashboard' });
    }
};

// Handle cancellation of a specific booking
const cancelBooking = async (req, res) => {
    try {

        // Find booking by ID and populate associated event
        const booking = await Booking.findById(req.params.id).populate('event');

        // Return error if booking does not exist
        if (!booking) {
            return res.status(404).render('error', { message: 'Booking not found' });
        }

        // Prevent cancellation if booking belongs to a different user
        if (booking.user.toString() !== req.session.userId.toString()) {
            return res.status(403).render('error', { message: 'Unauthorized' });
        }

        // Restore tickets to event capacity if booking was confirmed
        if (booking.status === 'Confirmed') {
            await Event.findByIdAndUpdate(booking.event._id, {
                $inc: { availableTickets: booking.ticketQuantity }
            });
        }

        // Update booking status to cancelled
        booking.status = 'Cancelled';

        // Save updated booking to database
        await booking.save();

        // Redirect user to dashboard with success message
        res.redirect('/bookings/dashboard?success=Booking cancelled');

    } catch (err) {

        // Log error to console for debugging
        console.error(err);

        // Render error page if cancellation fails
        res.status(500).render('error', { message: 'Cancellation failed' });
    }
};

// Retrieve all bookings and analytics data for admin dashboard
const getAdminDashboard = async (req, res) => {
    try {

        // Fetch all bookings with associated user and event details
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('event', 'title date')
            .sort({ createdAt: -1 });

        // Count total number of bookings
        const totalBookings = bookings.length;

        // Calculate total revenue from confirmed bookings only
        const totalRevenue = bookings
            .filter(b => b.status === 'Confirmed')
            .reduce((sum, b) => sum + b.totalPrice, 0);

        // Render admin dashboard with bookings and analytics
        res.render('bookings/adminDashboard', { bookings, totalBookings, totalRevenue });

    } catch (err) {

        // Log error to console for debugging
        console.error(err);

        // Render error page if admin dashboard fails to load
        res.status(500).render('error', { message: 'Could not load admin dashboard' });
    }
};

// Export all booking controller functions
module.exports = { createBooking, getUserDashboard, cancelBooking, getAdminDashboard };