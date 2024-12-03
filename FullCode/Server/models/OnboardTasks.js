const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    taskPdf: { type: String }, 
});

const OnboardingTask = mongoose.model('onboardingtasks', onboardingSchema);

module.exports = OnboardingTask;
