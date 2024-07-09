const RestaurantModel = require('../model/restaurant.model');

class RestaurantServices {
    static async addRestaurant(details) {
        try {
            const newRestaurant = new RestaurantModel(details);
            return await newRestaurant.save();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = RestaurantServices;
