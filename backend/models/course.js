const mongoose = require("mongoose");

const classScheduleSchema = new mongoose.Schema({
  time: String,
  subject: String
});

const dayScheduleSchema = new mongoose.Schema({
  [String]: [classScheduleSchema]
});

const courseSchema = new mongoose.Schema({
  _id: String,
  program: { type: String, required: true },
  slot: { type: String, required: true },
  days: [String],
  schedule: {
    type: Map,
    of: [classScheduleSchema]
  }
});

module.exports = mongoose.model("Course", courseSchema);