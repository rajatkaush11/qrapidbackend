const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    unit: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    variations: [variationSchema],
}, {
    timestamps: true,
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
