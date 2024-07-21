const RestaurantModel = require('../model/restaurant.model');

const createRestaurant = async (req, res) => {
  try {
    const { name, address, description, timing } = req.body;
    const clientId = req.user.clientId;

    const restaurant = new RestaurantModel({
      name,
      address,
      description,
      timing,
      clientId,
    });

    await restaurant.save();

    console.log('Restaurant created:', restaurant); // Log restaurant details

    res.status(201).send(restaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(400).send({ error: 'Error creating restaurant' });
  }
};

const getRestaurantByUser = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findOne({ clientId: req.user.clientId });
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }

    console.log('Restaurant details:', restaurant); // Log restaurant details

    res.status(200).send(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).send({ error: 'Error fetching restaurant details' });
  }
};

module.exports = {
  createRestaurant,
  getRestaurantByUser,
};
