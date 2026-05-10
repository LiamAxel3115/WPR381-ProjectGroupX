// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Define enquiry schema structure
const enquirySchema = new mongoose.Schema({

    // Store sender full name
    name: {
        type: String,
        required: true,
        trim: true
    },

    // Store sender email address
    email: {
        type: String,
        required: true,
        lowercase: true
    },

    // Store enquiry subject/title
    subject: {
        type: String,
        required: true,
        trim: true
    },

    // Store enquiry message content
    message: {
        type: String,
        required: true
    },

    // Track enquiry processing status
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    }

}, {

    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// Export Enquiry model
module.exports = mongoose.model('Enquiry', enquirySchema);