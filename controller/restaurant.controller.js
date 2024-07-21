const RestaurantModel = require('../model/restaurant.model');

const createRestaurant = async (req, res) => {
    try {
        const { name, address, description, email, password } = req.body;
        const image = req.file ? req.file.path : '';

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Please register as a user first' });
        }

        const restaurant = new RestaurantModel({
            name,
            address,
            description,
            image,
            owner: user._id
        });

        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send({ error: 'Error creating restaurant' });
    }
};

const getRestaurantByUser = async (req, res) => {
    try {
        const restaurant = await RestaurantModel.findOne({ owner: req.user._id });
        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching restaurant details' });
    }
};

module.exports = {
    createRestaurant,
    getRestaurantByUser
};
