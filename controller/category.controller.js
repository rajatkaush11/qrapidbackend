const CategoryModel = require('../model/category.model');

const createCategory = async (req, res) => {
    const { name, userId } = req.body;
    if (!name || !userId) {
        return res.status(400).send({ error: 'Category name and userId are required' });
    }
    try {
        const category = new CategoryModel({ name, user: userId });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(500).send({ error: 'Error creating category' });
    }
};

module.exports = {
    createCategory,
};
