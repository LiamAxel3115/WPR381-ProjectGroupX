// Import Event model
const Event = require('../models/Event');


// Create a new event 
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all events 
const getEvents = async (req, res) => {
    try {

        // Build filter object — exclude cancelled events
        const filter = { status: { $ne: 'Cancelled' } };

        // Apply category filter 
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Fetch filtered events sorted by date ascending
        const events = await Event.find(filter).sort({ date: 1 });

        // Render events listing page
        res.render('events', {
            events,
            user: req.session,
            selectedCategory: req.query.category || '',
            success: req.query.success || null,
            error: req.query.error || null
        });

    } catch (error) {
        res.status(500).render('error', { message: 'Could not load events' });
    }
};


// Get single event by ID 
const getEventById = async (req, res) => {
    try {

        // Find event by ID
        const event = await Event.findById(req.params.id);

        // Return error if event not found
        if (!event) {
            return res.status(404).render('error', { message: 'Event not found' });
        }

        // Render event detail page
        res.render('events/show', {
            event,
            user: req.session,
            error: req.query.error || null
        });

    } catch (error) {
        res.status(500).render('error', { message: 'Could not load event' });
    }
};


// Update existing event 
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete event 
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
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