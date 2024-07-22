const CategoryModel = require('../model/category.model');

const createCategory = async (req, res) => {
    const { name, image } = req.body;
    const userId = req.user._id; // Retrieve user ID from the authenticated user

    console.log('Request body:', req.body); // Log the request body
    if (!name || !userId) {
        console.log('Missing name or userId'); // Log missing fields
        return res.status(400).send({ error: 'Category name and userId are required' });
    }
    try {
        const category = new CategoryModel({ name, user: userId, image });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        console.log('Error creating category:', error); // Log the error
        res.status(500).send({ error: 'Error creating category' });
    }
};

const getCategoriesByUser = async (req, res) => {
    const userId = req.user._id; // Retrieve user ID from the authenticated user
    try {
        const categories = await CategoryModel.find({ user: userId });
        res.status(200).send(categories);
    } catch (error) {
        console.log('Error fetching categories:', error); // Log the error
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
        console.log('Error updating category:', error); // Log the error
        res.status(500).send({ error: 'Error updating category' });
    }
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    updateCategory,
};
