const ItemModel = require('../model/item.model');

class ItemServices {
    static async addItem(details) {
        try {
            const newItem = new ItemModel(details);
            return await newItem.save();
        } catch (err) {
            throw err;
        }
    }

    static async getItemsByCategory(categoryId) {
        try {
            return await ItemModel.find({ category: categoryId });
        } catch (err) {
            throw err;
        }
    }

    static async updateItem(id, details) {
        try {
            return await ItemModel.findByIdAndUpdate(id, details, { new: true });
        } catch (err) {
            throw err;
        }
    }

    static async deleteItem(id) {
        try {
            return await ItemModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ItemServices;
