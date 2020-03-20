module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    // Create a new students
    app.post('/students', students.create);

    // Retrieve all students
    app.get('/students', students.findAll);

    // Retrieve a single students with studentId
    app.get('/students/:studentId', students.findOne);

    // Update a students with studentId
    app.put('/students/:studentId', students.update);

    // Delete a students with studentId
    app.delete('/students/:studentId', students.delete);
}