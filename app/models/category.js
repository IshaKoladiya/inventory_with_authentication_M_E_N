const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  status: 
  { type: String, required: false },
  created_at: 
  { type: Date, default: Date.now },
  updated_at: 
  { type: Date, default: Date.now },
});

const category = mongoose.model('categories', categorySchema);

module.exports = category;