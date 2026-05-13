// Import Enquiry model
const Enquiry = require('../models/Enquiry');

// Create a new enquiry
const createEnquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        await Enquiry.create({ name, email, subject, message });

        res.redirect('/contact?success=Enquiry submitted successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/contact?error=Error submitting enquiry');
    }
};

// Get all enquiries (admin - render view)
const getEnquiries = async (req, res) => {
    try {
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

        const totalEnquiries = await Enquiry.countDocuments();
        const pendingEnquiries = await Enquiry.countDocuments({ status: 'Open' });
        const resolvedEnquiries = await Enquiry.countDocuments({ status: 'Resolved' });

        // Renders views/enquiries.ejs
        res.render('enquiries', {
            enquiries,
            totalEnquiries,
            pendingEnquiries,
            resolvedEnquiries,
            selectedStatus: req.query.status || ''
        });

    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching enquiries' });
    }
};

// Update enquiry status (admin - JSON response)
const updateEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json({ message: 'Enquiry status updated', enquiry });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating enquiry' });
    }
};

// Export controller functions
module.exports = {
    createEnquiry,
    getEnquiries,
    updateEnquiryStatus
};