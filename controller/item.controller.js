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
        res.status(201).send(item);
    } catch (error) {
        console.error("Failed to create item:", error);
        res.status(500).send({ error: 'Error creating item' });
    }
};

const getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        console.debug('Fetching items for category ID:', categoryId);
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            console.error('Invalid category ID:', categoryId);
            return res.status(400).send({ error: 'Invalid category ID' });
        }

        const items = await ItemModel.find({ category: categoryId });
        res.status(200).send(items);
    } catch (error) {
        console.error("Failed to fetch items:", error);
        res.status(500).send({ error: 'Error fetching items' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid item ID' });
        }
        const item = await ItemModel.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error("Failed to delete item:", error);
        res.status(500).send({ error: 'Error deleting item' });
    }
};

module.exports = {
    createItem,
    getItemsByCategory,
    deleteItem,
};
