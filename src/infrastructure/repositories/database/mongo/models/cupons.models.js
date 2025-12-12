const mongoose = require('mongoose');

const cuponsSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cupons', cuponsSchema);