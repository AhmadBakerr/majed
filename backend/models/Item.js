const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
  name: { type: String },
  photoUrl: { type: String },
  pricePerDay: { type: Number },
  pricePerWeek: { type: Number},
  pricePerMonth: { type: Number },
  category: { type: String },
  isPopular: { type: Boolean, default: false },
  brand: { type: String },
  isVisible: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Item', itemSchema);
