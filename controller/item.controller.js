const mongoose = require('mongoose');
const ItemModel = require('../model/item.model');
const CategoryModel = require('../model/category.model');

const createItem = async (req, res) => {
    const { name, price, description, categoryId, weight, unit } = req.body;
    const image = req.file ? req.file.path : '';  // Optional image handling

    // Check for required fields
    if (!name || !price || !description || !categoryId || !weight || !unit) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        console.error('Invalid category ID:', categoryId);
        return res.status(400).send({ error: 'Invalid category ID' });
    }

    try {
        // Find category by ID
        console.debug('Finding category with ID:', categoryId);
        const category = await CategoryModel.findOne({ _id: categoryId });
        if (!category) {
            console.error('Category not found for ID:', categoryId);
            return res.status(404).send({ error: 'Category not found' });
        }

        // Create new item
        const item = new ItemModel({
            name,
            price,
            description,
            category: categoryId,
            image,  // Optional image
            weight,
            unit
        });

        console.debug('Saving new item:', item);
        await item.save();  
        const tokenData = { _id: item._id };  
        const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, "2w");  
        res.status(201).send({ item, token });  
    } catch (error) {
        console.error("Failed to create item:", error);
        res.status(500).send({ error: 'Error creating item' });
    }
};

const getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            console.error('Invalid category ID:', categoryId);
            return res.status(400).send({ error: 'Invalid category ID' });
        }

        console.debug('Fetching items for category ID:', categoryId);
        const items = await ItemModel.find({ category: categoryId });
        res.status(200).send(items);
    } catch (error) {
        console.error("Failed to fetch items:", error);
        res.status(400).send({ error: 'Error fetching items' });
    }
};

module.exports = {
    createItem,
    getItemsByCategory
};
