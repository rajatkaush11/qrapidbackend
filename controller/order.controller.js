const OrderModel = require('../model/order.model');
const RestaurantModel = require('../model/restaurant.model'); // Assuming you have a restaurant model

// Create a new order
const createOrder = async (req, res) => {
    const { name, whatsapp, tableNo, items, uid } = req.body; // Include uid in the request body

    if (!name || !whatsapp || !items.length || !uid) {
        return res.status(400).send({ error: 'Name, WhatsApp number, order details, and UID are required' });
    }

    try {
        // Fetch restaurant name using the uid
        const restaurant = await RestaurantModel.findById(uid);
        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }

        const newOrder = new OrderModel({
            name,
            whatsapp,
            restaurantName: restaurant.name, // Use the fetched restaurant name
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
