const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: String,
    department: String,
    batch: String,
    studentId: String,
    contactNo: String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Students', StudentSchema);