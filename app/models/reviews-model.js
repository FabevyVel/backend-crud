const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    eventId: String,
    lecturers:[
        {
            studentId: String,
            name:String,
            department:String,
            batch:String,
            contactNo: String,
            lecturerId: String,
            review: String,
            reviewer: String,
            rating: String
        }
    ]
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Reviews', ReviewSchema);