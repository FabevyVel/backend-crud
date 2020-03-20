const Reviews = require('../models/reviews-model.js');

const Events = require('../models/event-model.js');


// Create and Save a new review
exports.create = (req, res) => {
    // Validate request
    if (!req.body.eventId) {
        return res.status(400).send({
            message: "eventId can not be empty"
        });
    }

    // Create a lec
    const reviews = new Reviews({
        eventId: req.body.eventId,
        lecturers: req.body.lecturers
    });


    // Save review in the database

    // To check already exist for Reviews list to stop duplicating

    Reviews.find({ eventId: { $eq: req.body.eventId } })
        .then(value => {
            console.log("this is value", value)
            if (value.length > 0) {
                res.status(401).send({
                    message: "Event Reviews already exist please edit the review list"
                });
            } else {
                reviews.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while adding lecturer"
                        });
                    });

            }
        });
}

// Retrieve and return all reviews from the database.
exports.findAll = (req, res) => {
    Reviews.find()
        .then(value => {
            res.send(value);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Lecturers."
            });
        });
};

// Find a single reviews with a reviewId
exports.findOne = (req, res) => {
    console.log("lweID", req.params.reviewId)
    Reviews.find({ eventId: { $eq: req.params.reviewId } })
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "reviews not found with id " + req.params.reviewId
                });
            }
            res.send(value);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "reviews not found with id " + req.params.reviewId
                });
            }
            return res.status(500).send({
                message: "Error retrieving reviews with id " + req.params.reviewId
            });
        });
};

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.params.reviewId) {
        return res.status(400).send({
            message: "reviewId  can not be empty"
        });
    }

    // Find Reviews and update it with the request body
    Reviews.findByIdAndUpdate(req.params.reviewId, {
        lecturers: req.body.lecturers,
    }, { new: true })
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "reviewId not found with id " + req.params.reviewId
                });
            }
            res.send(value);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "reviewId not found with id " + req.params.reviewId
                });
            }
            return res.status(500).send({
                message: "Error updating review with id " + req.params.reviewId
            });
        });
};

// Delete a Reviews with the specified ReviewId in the request
exports.delete = (req, res) => {
    Reviews.findByIdAndRemove(req.params.reviewId)
        .then(value => {
            if (!value) {
                return res.status(404).send({
                    message: "lecturers not found with id " + req.params.reviewId
                });
            }
            res.send({ message: "lecturers deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "lecturers not found with id " + req.params.reviewId
                });
            }
            return res.status(500).send({
                message: "Could not delete lecturers with id " + req.params.reviewId
            });
        });
};
