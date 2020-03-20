const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: String,
    hostdepartment: String,
    date: String,
    lecturerCount: Number,
    eventId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Events', EventSchema);