const CategoryModel = require('../model/category.model');

const createCategory = async (req, res) => {
    const { name, image, restaurantId } = req.body; // Ensure restaurantId is part of the request body
    const userId = req.user._id;

    console.log('Request body:', req.body);
    if (!name || !userId || !restaurantId) {
        console.log('Missing name, userId, or restaurantId');
        return res.status(400).send({ error: 'Category name, userId, and restaurantId are required' });
    }
    try {
        const category = new CategoryModel({ name, user: userId, restaurant: restaurantId, image });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        console.log('Error creating category:', error);
        res.status(500).send({ error: 'Error creating category' });
    }
};


const getCategoriesByUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const categories = await CategoryModel.find({ user: userId });
        res.status(200).send(categories);
    } catch (error) {
        console.log('Error fetching categories:', error);
        res.status(500).send({ error: 'Error fetching categories' });
    }
};

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, image } = req.body;
    try {
        const category = await CategoryModel.findByIdAndUpdate(categoryId, { name, image }, { new: true });
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.status(200).send(category);
    } catch (error) {
        console.log('Error updating category:', error);
        res.status(500).send({ error: 'Error updating category' });
    }
};

const getCategoriesByRestaurantAndUser = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const userId = req.params.userId;
    try {
        console.log('Fetching categories for restaurantId:', restaurantId, 'and userId:', userId);
        const categories = await CategoryModel.find({ user: userId, restaurant: restaurantId });
        if (categories.length === 0) {
            console.warn('No categories found');
        }
        console.log('Fetched categories:', categories);
        res.status(200).send(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send({ error: 'Error fetching categories' });
    }
};


const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await CategoryModel.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        console.log('Error deleting category:', error);
        res.status(500).send({ error: 'Error deleting category' });
    }
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    updateCategory,
    getCategoriesByRestaurantAndUser,
    deleteCategory
};
