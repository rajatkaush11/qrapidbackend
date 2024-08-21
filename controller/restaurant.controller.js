const RestaurantModel = require('../model/restaurant.model');
const crypto = require('crypto');

// Function to generate a new token
const generateBestTimeToken = () => {
    const token = crypto.randomBytes(16).toString('hex');
    const validPeriod = new Date();
    validPeriod.setDate(validPeriod.getDate() + 30); // Set token validity for 30 days
    console.log(`Generated new token: ${token} with validity until: ${validPeriod}`); // Debug log
    return { token, validPeriod };
};

// Function to validate the token
const validateToken = async (restaurant) => {
  const currentDate = new Date();
  console.log(`Validating token for restaurant: ${restaurant.restaurantName}. Current date: ${currentDate}, Token valid until: ${restaurant.tokenValidUntil}`); // Debug log

  if (currentDate > restaurant.tokenValidUntil) {
      console.log(`Token expired for restaurant: ${restaurant.restaurantName}, generating a new one.`); // Debug log
      const { token, validPeriod } = generateBestTimeToken();
      restaurant.bestTimeToken = token;
      restaurant.tokenValidUntil = validPeriod;
      await restaurant.save();
      console.log(`New token generated and saved for restaurant: ${restaurant.restaurantName}`); // Debug log
  } else {
      console.log(`Token for restaurant: ${restaurant.restaurantName} is still valid.`); // Debug log
  }
  return restaurant.bestTimeToken;
};

// Create a new restaurant
const createRestaurant = async (req, res) => {
    const { uid, restaurantName, address, description, timing, email, imageUrl } = req.body;

    console.log('Incoming request body:', req.body); // Debug log

    if (!uid || !restaurantName || !address || !description || !timing || !email) {
        console.error('Missing fields in the request body'); // Debug log
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
        console.log('Restaurant details saved to MongoDB successfully'); // Debug log
        res.status(201).send(newRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error); // Debug log
        res.status(500).send({ error: 'Error creating restaurant' });
    }
};

// Get restaurant by UID with token validation
const getRestaurantByUid = async (req, res) => {
    const { uid } = req.params;

    try {
        console.log(`Received request to fetch restaurant details for UID: ${uid}`); // Debug log
        
        let restaurant = await RestaurantModel.findOne({ uid });
        if (!restaurant) {
            console.error(`Restaurant with UID ${uid} not found`); // Debug log
            return res.status(404).send({ error: 'Restaurant not found' });
        }

        console.log(`Restaurant found: ${restaurant.restaurantName}. Validating token...`); // Debug log

        const validToken = await validateToken(restaurant);

        console.log(`Returning restaurant details with valid token: ${validToken}`); // Debug log
        res.status(200).send({ restaurantName: restaurant.restaurantName, bestTimeToken: validToken });
    } catch (error) {
        console.error('Error fetching restaurant by UID:', error); // Debug log
        res.status(500).send({ error: 'Error fetching restaurant' });
    }
};

module.exports = {
    createRestaurant,
    getRestaurantByUid,
};
