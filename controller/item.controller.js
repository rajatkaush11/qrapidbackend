const mongoose = require('mongoose');
const ItemModel = require('../model/item.model');
const CategoryModel = require('../model/category.model');

// Create a new item
const createItem = async (req, res) => {
    const { name, price, description, categoryId, weight, unit, variations, image = '' } = req.body;

    console.log("Incoming item data:", req.body); // Debugging incoming data

    if (!name || !price || !description || !categoryId) {
        return res.status(400).send({ error: 'Name, price, description, and categoryId are required' });
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
        });

        console.log("Saving new item:", newItem); // Debugging item before saving
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        console.error("Failed to create item:", error);
        res.status(500).send({ error: 'Error creating item' });
    }
};

// Get items by category ID and user ID
const getItemsByCategory = async (req, res) => {
    const { categoryId, uid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).send({ error: 'Invalid category ID' });
    }

    try {
        const items = await ItemModel.find({ category: categoryId });

        if (!items.length) {
            return res.status(404).send({ error: 'No items found for this category' });
        }

        res.status(200).send(items);
    } catch (error) {
        console.error("Failed to fetch items:", error.message);
        res.status(500).send({ error: 'Error fetching items', details: error.message });
    }
};

// Update an item by its ID
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, weight, unit, variations, image = '' } = req.body;

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

module.exports = {
    createItem,
    getItemsByCategory,
    updateItem,
    deleteItem,
};
