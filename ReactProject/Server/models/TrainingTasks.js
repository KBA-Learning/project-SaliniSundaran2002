const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    assignedRole: { type: String, required: true },
    duration: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coursePdf: { type: String },  // New field for storing the PDF file path
});

const Training = mongoose.model('trainingtasks', trainingSchema);

module.exports = Training;
