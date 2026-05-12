// Import Express router
const express = require('express');

// Create router instance
const router = express.Router();

// Import event controller functions
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');


// Route to create a new event
router.post('/', createEvent);


// Route to get all events
router.get('/', getEvents);


// Route to get single event by ID
router.get('/:id', getEventById);


// Route to update event by ID
router.put('/:id', updateEvent);


// Route to delete event by ID
router.delete('/:id', deleteEvent);


// Export router
module.exports = router;