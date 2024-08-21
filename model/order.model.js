const mongoose = require('mongoose');

// Helper function to get the current time in IST
const getCurrentISTTime = () => {
    const now = new Date();
    const istOffset = 5 * 60 + 30; // IST is UTC +5:30
    const istTime = new Date(now.getTime() + istOffset * 60 * 1000);
    return istTime;
};

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    whatsapp: {
        type: String,
        required: true,
        trim: true
    },
    restaurantName: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: getCurrentISTTime  // Use IST as default date
    },
    orderDetails: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
