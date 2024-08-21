const Order = require('../models/order.model');

const createOrder = async (req, res) => {
    try {
        const { name, whatsapp, restaurantName, tableNo, items } = req.body;

        // Creating a new order
        const newOrder = new Order({
            name,
            whatsapp,
            restaurantName,
            tableNo,
            items,
        });

        // Save the order in MongoDB
        const savedOrder = await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ error: 'Failed to place order', details: error.message });
    }
};

module.exports = {
    createOrder,
};
