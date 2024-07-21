const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  isGoogleUser: {
    type: Boolean,
    required: true,
  },
  token: {
    type: String,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
