const mongoose = require('mongoose');

const lecturerSchema = mongoose.Schema({
    eventId: String,
    lecturers:[
        {
            studentId: String,
            name:String,
            department:String,
            batch:String,
            contactNo: String,
            lecturerId: String
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model('lecturer', lecturerSchema);