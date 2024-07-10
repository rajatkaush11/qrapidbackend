const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: false  // Set to false if weight is optional
    },
    unit: {
        type: String,
        required: false  // Set to false if unit is optional
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
