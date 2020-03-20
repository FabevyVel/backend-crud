module.exports = (app) => {
    const lecturer = require('../controllers/lecturer.controller.js');

    // Create a new lecturer
    app.post('/lecturers', lecturer.create);

    // Retrieve all lecturer
    app.get('/lecturers', lecturer.findAll);

    // Retrieve a lecturer event with eventId
    app.get('/lecturers/:eventId', lecturer.findOne);

    // Update a lecturer with _Id
    app.put('/lecturers/:eventId', lecturer.update);

    // Delete a lecturer with _Id
    app.delete('/lecturers/:eventId', lecturer.delete);
}