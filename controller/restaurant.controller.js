const RestaurantModel = require('../model/restaurant.model');
const ClientModel = require('../model/client.model'); // Assuming you have a Client model

const createRestaurant = async (req, res) => {
  try {
    const { name, address, description, timing } = req.body;
    const owner = req.user.id; // Adjust this based on how Clerk provides the user ID

    // Automatically create a new Client ID
    const client = new ClientModel(); 
    await client.save();

    const restaurant = new RestaurantModel({
      name,
      address,
      description,
      timing,
      owner,
      clientid: client._id,
    });

    await restaurant.save();

    console.log('Restaurant created:', restaurant); // Log restaurant details

    res.status(201).send(restaurant);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error creating restaurant' });
  }
};

const getRestaurantByUser = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findOne({ owner: req.user.id }); // Adjust this based on how Clerk provides the user ID
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }

    console.log('Restaurant details:', restaurant); // Log restaurant details

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
