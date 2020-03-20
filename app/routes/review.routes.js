module.exports = (app) => {
    const reviews = require('../controllers/reviews.controller.js');

    // Create a new reviews
    app.post('/reviews', reviews.create);

    // Retrieve all reviews
    app.get('/reviews', reviews.findAll);

    // Retrieve a single reviews with eventId
    app.get('/reviews/:reviewId', reviews.findOne);

    // Update a Note with reviews
    app.put('/reviews/:reviewId', reviews.update);

    // Delete a Note with reviews
    app.delete('/reviews/:reviewId', reviews.delete);
}