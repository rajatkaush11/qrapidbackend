const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Make sure the reference is correct
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
