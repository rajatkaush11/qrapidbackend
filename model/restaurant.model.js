const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  restaurantName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  timing: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  bestTimeToken: {
    type: String,
    required: true,
  },
  tokenValidUntil: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = RestaurantModel;
