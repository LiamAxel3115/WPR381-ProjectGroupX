// Import Express and create router instance
const express = require('express');
const router = express.Router();

// Import enquiry controller functions
const {
    createEnquiry,
    getEnquiries,
    updateEnquiryStatus
} = require('../controllers/enquiryController');

// Import authentication and authorization middleware
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Route to display contact page
router.get('/contact', (req, res) => {

    // Render contact page with optional messages
    res.render('contact', {
        success: req.query.success,
        error: req.query.error
    });
});

// Route to create a new enquiry (public)
router.post('/enquiries/', createEnquiry);

// Route to get all enquiries (admin only)
router.get('/enquiries/', isAuthenticated, isAdmin, getEnquiries);

// Route to update enquiry status (admin only)
router.post('/enquiries/:id', isAuthenticated, isAdmin, updateEnquiryStatus);

// Export router
module.exports = router;