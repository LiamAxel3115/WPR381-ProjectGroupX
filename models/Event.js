// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Define the event schema structure
const eventSchema = new mongoose.Schema({

    // Store event title
    title: {
        type: String,
        required: true,
        trim: true
    },

    // Store event description
    description: {
        type: String,
        required: true
    },

    // Store event date
    date: {
        type: Date,
        required: true
    },

    // Store event venue/location
    venue: {
        type: String,
        required: true
    },

    // Store event category
    category: {
        type: String,
        enum: ['Music', 'Sports', 'Business', 'Technology', 'Education'],
        required: true
    },

    // Store maximum event capacity
    capacity: {
        type: Number,
        required: true,
        min: 1
    },

    // Store current number of tickets sold
    ticketsSold: {
        type: Number,
        default: 0
    },

    // Store price per ticket
    ticketPrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    // Reference the user/admin who created the event
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Store event status
    status: {
        type: String,
        enum: ['Upcoming', 'Active', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    }

}, {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
});

// Virtual field to calculate available tickets without storing in DB
eventSchema.virtual('availableTickets').get(function () {
    return this.capacity - this.ticketsSold;
});

// Virtual field to check if event is sold out
eventSchema.virtual('isSoldOut').get(function () {
    return this.ticketsSold >= this.capacity;
});

// Export Event model
module.exports = mongoose.model('Event', eventSchema);