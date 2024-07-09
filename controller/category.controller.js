const CategoryModel = require('../model/category.model');
const ItemModel = require('../model/item.model');

const createCategory = async (req, res) => {
    const { name, restaurantId } = req.body;
    if (!name || !restaurantId) {
        return res.status(400).send({ error: 'Category name and restaurantId are required' });
    }
    try {
        const category = new CategoryModel({ name, restaurant: restaurantId });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(500).send({ error: 'Error creating category' });
    }
};

const getCategoriesByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const categories = await CategoryModel.find({ restaurant: restaurantId });
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send({ error: 'Error fetching categories' });
    }
};

const getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const items = await ItemModel.find({ category: categoryId });
        res.status(200).send(items);
    } catch (error) {
        res.status(400).send({ error: 'Error fetching items' });
    }
};

module.exports = {
    createCategory,
    getCategoriesByRestaurant,
    getItemsByCategory
};
