const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  address: { type: String },
});

// Use existing model if already compiled
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
