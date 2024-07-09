const CategoryModel = require('../model/category.model');

class CategoryServices {
    static async addCategory(details) {
        try {
            const newCategory = new CategoryModel(details);
            return await newCategory.save();
        } catch (err) {
            throw err;
        }
    }

    static async getCategoriesByRestaurant(restaurantId) {
        try {
            return await CategoryModel.find({ restaurant: restaurantId });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CategoryServices;
