const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  time: String,         // Format: "HH:MM"
  subject: String
});

const scheduleSchema = new mongoose.Schema({
  stream: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  Monday: [classSchema],
  Tuesday: [classSchema],
  Wednesday: [classSchema],
  Thursday: [classSchema],
  Friday: [classSchema],
  Saturday: [classSchema],
  Sunday: [classSchema]
});

module.exports = mongoose.model('Schedule', scheduleSchema);
