const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String,required: true},
  stream: { type: String, required: true },
  slot: { type: String, required: true },
  registration:{type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
