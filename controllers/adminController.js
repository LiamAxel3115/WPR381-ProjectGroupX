const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');

const dashboard = async (req, res) => {
    try {

        // Basic counts
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalEnquiries = await Enquiry.countDocuments();

        // Revenue (confirmed only)
        const revenueResult = await Booking.aggregate([
            { $match: { status: 'Confirmed' } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
        ]);

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        // Events with booking info
        const events = await Event.find().sort({ date: 1 });

        res.render('admin/dashboard', {
            user: req.session,
            totalUsers,
            totalEvents,
            totalBookings,
            totalEnquiries,
            totalRevenue,
            events
        });

    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            message: 'Dashboard failed to load'
        });
    }
};

module.exports = { dashboard };