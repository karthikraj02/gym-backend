const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tag: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  emoji: {
    type: String,
    default: '🔥',
  },
  schedule: {
    type: String,
    default: '',
  },
  trainer: {
    type: String,
    default: '',
  },
  capacity: {
    type: Number,
    default: 30,
  },
  enrolled: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Class', classSchema);
