const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tier: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    default: '/mo',
  },
  features: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: String,
    default: '',
  },
  durationDays: {
    type: Number,
    default: 30,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pass', passSchema);
