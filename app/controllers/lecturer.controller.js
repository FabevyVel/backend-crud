const Lecturers = require('../models/lecturer-model.js');

const Events = require('../models/event-model.js');


// Create and Save a new lecturer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.eventId) {
        return res.status(400).send({
            message: "eventId can not be empty"
        });
    }

    // Create a lec
    const lecturer = new Lecturers({
        eventId: req.body.eventId,
        lecturers: req.body.lecturers
    });


    lecturer.lecturers.forEach(element => {
        element.lecturerId = element._id
    });

    const lecturerCount = lecturer.lecturers.length;

    // Save lecturer in the database


    Events.findByIdAndUpdate(req.body.eventId, {
        lecturerCount: lecturerCount,
    }, { new: true })
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "event not found with id " + req.body.eventId
                });
            }

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "event not found with id " + req.body.eventId
                });
            }
            return res.status(500).send({
                message: "Error updating event with id " + req.params.eventId
            });
        });


    Lecturers.find({ eventId: { $eq: req.body.eventId } })
        .then(value => {
            console.log("this is value", value)
            if (value.length > 0) {
                res.status(401).send({
                    message: "Event lecturer already assigned please edit the lecturer list"
                });
            } else {

                lecturer.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while adding lecturer"
                        });
                    });
            }

        });








};

// Retrieve and return all lecturer from the database.
exports.findAll = (req, res) => {
    Lecturers.find()
        .then(value => {
            res.send(value);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Lecturers."
            });
        });
};

// Find a single lecturer with a eventId
exports.findOne = (req, res) => {
    console.log("lweID", req.params.eventId)
    Lecturers.find({ eventId: { $eq: req.params.eventId } })
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "lecturer not found with id " + req.params.eventId
                });
            }

            console.log("value", value)
            res.send(value);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "lecturer not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Error retrieving lecturer with id " + req.params.eventId
            });
        });
};

// Update a lecturer identified by the eventId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.params.eventId) {
        return res.status(400).send({
            message: "lecId  can not be empty"
        });
    }

    // Find lecturer and update it with the request body
    Lecturers.findByIdAndUpdate(req.params.eventId, {
        lecturers: req.body.lecturers,
    }, { new: true })
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "lecturers not found with id " + req.params.eventId
                });
            }
            res.send(value);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "lecturers not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Error updating lecturers with id " + req.params.eventId
            });
        });
};

// Delete a lecturer with the specified noteId in the request
exports.delete = (req, res) => {
    Lecturers.findByIdAndRemove(req.params.eventId)
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "lecturers not found with id " + req.params.eventId
                });
            }
            res.send({ message: "lecturers deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "lecturers not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Could not delete lecturers with id " + req.params.eventId
            });
        });
};
