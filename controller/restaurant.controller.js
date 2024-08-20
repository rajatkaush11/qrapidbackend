const RestaurantModel = require('../model/restaurant.model');

const createRestaurant = async (req, res) => {
  const { uid, restaurantName, address, description, timing, email, imageUrl } = req.body;

  if (!uid || !restaurantName || !address || !description || !timing || !email) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const newRestaurant = new RestaurantModel({
      uid,
      restaurantName,
      address,
      description,
      timing,
      email,
      imageUrl,
    });

    await newRestaurant.save();
    console.log('Restaurant details saved to MongoDB successfully');
    res.status(201).send(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).send({ error: 'Error creating restaurant' });
  }
};

module.exports = {
  createRestaurant,
};
