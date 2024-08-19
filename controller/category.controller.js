const CategoryModel = require('../model/category.model');

// Create a new category
const createCategory = async (req, res) => {
    const { name, image } = req.body;
    const userId = req.body.uid;  // Receive UID from the frontend

    if (!name || !userId) {
        return res.status(400).send({ error: 'Category name and userId are required' });
    }

    try {
        const category = new CategoryModel({ name, user: userId, image });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send({ error: 'Error creating category' });
    }
};

// Get categories by user ID
const getCategoriesByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const categories = await CategoryModel.find({ user: userId });
        res.status(200).send(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send({ error: 'Error fetching categories' });
    }
};

// Update a category by its ID
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
        console.error('Error updating category:', error);
        res.status(500).send({ error: 'Error updating category' });
    }
};

// Delete a category by its ID
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await CategoryModel.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send({ error: 'Error deleting category' });
    }
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    updateCategory,
    deleteCategory
};
