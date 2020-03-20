module.exports = (app) => {
    const events = require('../controllers/event.controller.js');

    // Create a new events
    app.post('/events', events.create);

    // Retrieve all events
    app.get('/events', events.findAll);

    // Retrieve a single event with eventId
    app.get('/events/:eventId', events.findOne);

    // Update a events with eventId
    app.put('/events/:eventId', events.update);

    // Delete a event with eventId
    app.delete('/events/:eventId', events.delete);
}