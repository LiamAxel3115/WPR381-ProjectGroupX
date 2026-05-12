// Import Enquiry model
const Enquiry = require('../models/Enquiry');

// Create a new enquiry
const createEnquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create new enquiry
        const enquiry = await Enquiry.create({
            name,
            email,
            subject,
            message
        });

        // Redirect back to contact with success message
        res.redirect('/contact?success=Enquiry submitted successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/contact?error=Error submitting enquiry');
    }
};

// Get all enquiries (for admin)
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching enquiries' });
    }
};

// Update enquiry status (for admin)
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