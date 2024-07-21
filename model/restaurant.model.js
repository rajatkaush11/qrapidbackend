const RestaurantModel = require('../model/restaurant.model');

const createRestaurant = async (req, res) => {
  try {
    const { name, address, description, timing, clientId } = req.body;

    if (!clientId) {
      return res.status(400).send({ error: 'clientId is required' });
    }

    const restaurant = new RestaurantModel({
      name,
      address,
      description,
      timing,
      owner: clientId, // Use clientId directly
    });

    await restaurant.save();

    console.log('Restaurant created:', restaurant);

    res.status(201).send(restaurant);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error creating restaurant' });
  }
};

const getRestaurantByUser = async (req, res) => {
  try {
    const { clientId } = req.query; // Assuming clientId is passed as a query parameter

    if (!clientId) {
      return res.status(400).send({ error: 'clientId is required' });
    }

    const restaurant = await RestaurantModel.findOne({ owner: clientId });
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }

    console.log('Restaurant details:', restaurant);

    res.status(200).send(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching restaurant details' });
  }
};

module.exports = {
  createRestaurant,
  getRestaurantByUser,
};
