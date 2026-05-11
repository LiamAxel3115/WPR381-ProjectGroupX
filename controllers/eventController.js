// Import Event model
const Event = require('../models/Event');


// Create a new event
const createEvent = async (req, res) => {

    try {

        // Create new event using request data
        const event = await Event.create(req.body);

        // Send success response
        res.status(201).json(event);

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: error.message
        });
    }
};


// Get all events
const getEvents = async (req, res) => {

    try {

        // Fetch all events from database
        const events = await Event.find();

        // Send events data
        res.status(200).json(events);

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: error.message
        });
    }
};


// Get single event by ID
const getEventById = async (req, res) => {

    try {

        // Find event using request parameter ID
        const event = await Event.findById(req.params.id);

        // Check if event exists
        if (!event) {

            return res.status(404).json({
                message: 'Event not found'
            });
        }

        // Send single event data
        res.status(200).json(event);

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: error.message
        });
    }
};


// Update existing event
const updateEvent = async (req, res) => {

    try {

        // Find and update event
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Check if event exists
        if (!event) {

            return res.status(404).json({
                message: 'Event not found'
            });
        }

        // Send updated event data
        res.status(200).json(event);

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete event
const deleteEvent = async (req, res) => {

    try {

        // Find and delete event
        const event = await Event.findByIdAndDelete(req.params.id);

        // Check if event exists
        if (!event) {

            return res.status(404).json({
                message: 'Event not found'
            });
        }

        // Send delete success response
        res.status(200).json({
            message: 'Event deleted successfully'
        });

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: error.message
        });
    }
};


// Export controller functions
module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};