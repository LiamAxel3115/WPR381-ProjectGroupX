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

// Route to create a new enquiry (public)
router.post('/', createEnquiry);

// Route to get all enquiries (admin only)
router.get('/', isAuthenticated, isAdmin, getEnquiries);

// Route to update enquiry status (admin only)
router.post('/:id', isAuthenticated, isAdmin, updateEnquiryStatus);

// Export router
module.exports = router;