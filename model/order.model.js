const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    whatsapp: {
        type: String,
        required: true,
        trim: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    tableNo: {
        type: String,
        required: true,
    },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    dateTime: {
        type: Date,
        default: () => {
            // Convert to Indian Standard Time (IST)
            const offset = 5.5 * 60 * 60 * 1000;
            return new Date(Date.now() + offset);
        },
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
