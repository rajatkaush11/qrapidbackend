const RestaurantModel = require('../model/restaurant.model');
const crypto = require('crypto');

const generateBestTimeToken = () => {
  const token = crypto.randomBytes(16).toString('hex');
  const validPeriod = new Date();
  validPeriod.setDate(validPeriod.getDate() + 30); 
  return { token, validPeriod };
};

const createRestaurant = async (req, res) => {
  const { uid, restaurantName, address, description, timing, email, imageUrl } = req.body;

  console.log('Incoming request body:', req.body);

  if (!uid || !restaurantName || !address || !description || !timing || !email) {
    console.error('Missing fields in the request body');
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const { token, validPeriod } = generateBestTimeToken(); 

    const newRestaurant = new RestaurantModel({
      uid,
      restaurantName,
      address,
      description,
      timing,
      email,
      imageUrl,
      bestTimeToken: token,
      tokenValidUntil: validPeriod
    });

    await newRestaurant.save();
    console.log('Restaurant details saved to MongoDB successfully');
    res.status(201).send(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).send({ error: 'Error creating restaurant' });
  }
};

const getRestaurantByUid = async (req, res) => {
  const { uid } = req.params;

  try {
    const restaurant = await RestaurantModel.findOne({ uid }, 'restaurantName');
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }
    res.status(200).send(restaurant); 
  } catch (error) {
    console.error('Error fetching restaurant by UID:', error);
    res.status(500).send({ error: 'Error fetching restaurant' });
  }
};

module.exports = {
  createRestaurant,
  getRestaurantByUid, 
};
