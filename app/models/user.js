const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  created_at: 
  { type: Date, default: Date.now },
  updated_at: 
  { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema);

module.exports = User;