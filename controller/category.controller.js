const CategoryModel = require('../model/category.model');

const createCategory = async (req, res) => {
    const { name, userId } = req.body;
    console.log('Request body:', req.body); // Log the request body
    if (!name || !userId) {
        console.log('Missing name or userId'); // Log missing fields
        return res.status(400).send({ error: 'Category name and userId are required' });
    }
    try {
        const category = new CategoryModel({ name, user: userId });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        console.log('Error creating category:', error); // Log the error
        res.status(500).send({ error: 'Error creating category' });
    }
};

module.exports = {
    createCategory,
};
