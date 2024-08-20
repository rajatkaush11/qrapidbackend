const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    restaurantUid: {
        type: String,
        required: true,
        ref: 'Restaurant', // Assuming you have a reference to the Restaurant model
    },
}, {
    timestamps: true,
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
