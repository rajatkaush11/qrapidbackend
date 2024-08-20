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
        ref: 'Restaurant',
    },
    restaurantName: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
