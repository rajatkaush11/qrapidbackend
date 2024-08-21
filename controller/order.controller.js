const OrderModel = require('../model/order.model');

// Create a new order
const createOrder = async (req, res) => {
    const { name, whatsapp, tableNo, items } = req.body;

    if (!name || !whatsapp || !items.length) {
        return res.status(400).send({ error: 'Name, WhatsApp number, and order details are required' });
    }

    try {
        const newOrder = new OrderModel({
            name,
            whatsapp,
            restaurantName: "Your Restaurant Name", // You can customize this or get it from request
            orderDetails: items
        });

        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).send({ error: 'Error creating order', details: error.message });
    }
};

module.exports = {
    createOrder,
};
