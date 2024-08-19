const mongoose = require('mongoose');
const ItemModel = require('../model/item.model');
const CategoryModel = require('../model/category.model');

// Create a new item
const createItem = async (req, res) => {
    const { name, price, description, categoryId, weight, unit, variations } = req.body;
    const image = req.body.image || '';  // Handle image as base64 from the frontend

    if (!name || !price || !description || !categoryId) {
        return res.status(400).send({ error: 'All fields except weight and unit are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).send({ error: 'Invalid category ID' });
    }

    try {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }

        const newItem = new ItemModel({
            name,
            price,
            description,
            category: categoryId,
            image,
            weight,
            unit,
            variations: variations || [],
            user: req.user._id  // Assuming the user's ID is stored in req.user._id
        });

        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        console.error("Failed to create item:", error);
        res.status(500).send({ error: 'Error creating item' });
    }
};

// Get items by category ID
const getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({ error: 'Invalid category ID' });
        }

        const items = await ItemModel.find({ category: categoryId });
        res.status(200).send(items);
    } catch (error) {
        console.error("Failed to fetch items:", error);
        res.status(500).send({ error: 'Error fetching items' });
    }
};

// Update an item by its ID
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, weight, unit, variations } = req.body;
    const image = req.body.image || '';  // Handle image as base64 from the frontend

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid item ID' });
    }

    try {
        const item = await ItemModel.findById(id);
        if (!item) {
            return res.status(404).send({ error: 'Item not found' });
        }

        item.name = name || item.name;
        item.price = price || item.price;
        item.description = description || item.description;
        item.image = image || item.image;
        item.weight = weight || item.weight;
        item.unit = unit || item.unit;
        item.variations = variations || item.variations;

        await item.save();
        res.status(200).send(item);
    } catch (error) {
        console.error("Failed to update item:", error);
        res.status(500).send({ error: 'Error updating item' });
    }
};

// Delete an item by its ID
const deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid item ID' });
    }

    try {
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

// Get items by category ID and user ID (if needed)
const getItemsByCategoryAndUser = async (req, res) => {
    try {
        const { categoryId, userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({ error: 'Invalid category ID' });
        }

        const items = await ItemModel.find({ category: categoryId, user: userId });
        res.status(200).send(items);
    } catch (error) {
        console.error("Failed to fetch items:", error);
        res.status(500).send({ error: 'Error fetching items' });
    }
};

module.exports = {
    createItem,
    getItemsByCategory,
    updateItem,
    deleteItem,
    getItemsByCategoryAndUser
};
