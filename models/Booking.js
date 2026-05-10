// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Define booking schema structure
const bookingSchema = new mongoose.Schema({

    // Reference the user making the booking
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Reference the booked event
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    // Store number of tickets booked
    ticketQuantity: {
        type: Number,
        required: true,
        min: 1
    },

    // Store total booking price
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    // Store booking status
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }

}, {

    // Automatically add createdAt and updatedAt fields
    timestamps: true
});

// Export Booking model
module.exports = mongoose.model('Booking', bookingSchema);