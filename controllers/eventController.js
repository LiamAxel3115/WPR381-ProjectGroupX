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
        const filter = { status: { $ne: 'Cancelled' } };

        // Filter by category
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Filter by date - show only events from today onwards
        if (req.query.date === 'upcoming') {
            filter.date = { $gte: new Date() };
        } else if (req.query.date === 'past') {
            filter.date = { $lt: new Date() };
        }

        // Filter by availability - only show events with tickets left
        let events = await Event.find(filter).sort({ date: 1 });

        if (req.query.availability === 'available') {
            events = events.filter(e => e.ticketsSold < e.capacity);
        } else if (req.query.availability === 'soldout') {
            events = events.filter(e => e.ticketsSold >= e.capacity);
        }

        res.render('events', {
            events,
            user: req.session,
            selectedCategory: req.query.category || '',
            selectedDate: req.query.date || '',
            selectedAvailability: req.query.availability || '',
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

// Get home page with event listing, search and category filter
const getHomePage = async (req, res) => {
    try {
        const filter = { status: { $ne: 'Cancelled' } };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.search) {
            filter.title = { $regex: req.query.search, $options: 'i' };
        }

        const events = await Event.find(filter).sort({ date: 1 });

        res.render('index', {
            events,
            user: req.session,
            selectedCategory: req.query.category || '',
            search: req.query.search || ''
        });

    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Could not load homepage' });
    }
};



// Export controller functions
module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getHomePage
};