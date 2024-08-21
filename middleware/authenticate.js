const RestaurantModel = require('../model/restaurant.model');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const restaurant = await RestaurantModel.findOne({ bestTimeToken: token });

        if (!restaurant) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const currentDateTime = new Date();
        if (currentDateTime > new Date(restaurant.tokenValidUntil)) {
            return res.status(401).json({ message: 'Token expired' });
        }

        req.restaurant = restaurant;
        next(); 
    } catch (error) {
        console.error('Error in authentication:', error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

module.exports = authenticate;
