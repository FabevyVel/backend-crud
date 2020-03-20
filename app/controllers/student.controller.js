const Students = require('../models/student-model.js');

// Create and Save a new Students
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "student Name can not be empty"
        });
    }
    if (!req.body.department) {
        return res.status(400).send({
            message: "student department can not be empty"
        });
    }
    if (!req.body.batch) {
        return res.status(400).send({
            message: "student batch can not be empty"
        });
    }
    if (!req.body.contactNo) {
        return res.status(400).send({
            message: "student contactNo can not be empty"
        });
    }

    // Create a Students
    const students = new Students({
        name: req.body.name,
        department: req.body.department,
        batch: req.body.batch,
        contactNo: req.body.contactNo
    });

    students.studentId= students._id
    // Save Students in the database
    students.save()
        .then(data => {           
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the students."
            });
        });
};

// Retrieve and return all student list from the database.
exports.findAll = (req, res) => {
    Students.find()
        .then(value => {
            res.send(value);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving students."
            });
        });
};

// Find a single students with a studentId
exports.findOne = (req, res) => {
    Students.findById(req.params.studentId)
        .then(students => {
            if (!students) {
                return res.status(404).send({
                    message: "students not found with id " + req.params.studentId
                });
            }
            res.send(students);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "studentId not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving studentId with id " + req.params.studentId
            });
        });
};

// Update a note identified by the students in the request with studentId
exports.update = (req, res) => {
    // Validate Request
    if (!req.params.studentId) {
        return res.status(400).send({
            message: "studentId  can not be empty"
        });
    }

    // Find note and update it with the request body
    Students.findByIdAndUpdate(req.params.studentId, {
        name: req.body.name,
        department: req.body.department,
        batch: req.body.batch,
        contactNo: req.body.contactNo
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Error updating student with id " + req.params.studentId
            });
        });
};

// Delete a students with the specified studentId in the request
exports.delete = (req, res) => {
    Students.findByIdAndRemove(req.params.studentId)
        .then(students => {
            if (!students) {
                return res.status(404).send({
                    message: "students not found with id " + req.params.studentId
                });
            }
            res.send({ message: "student deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Could not delete student with id " + req.params.studentId
            });
        });
};
