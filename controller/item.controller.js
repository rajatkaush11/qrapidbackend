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

// Get items by category ID
const getItemsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        console.log(`Invalid category ID: ${categoryId}`); // Debug log
        return res.status(400).send({ error: 'Invalid category ID' });
    }

    try {
        console.log(`Fetching items for category ID: ${categoryId}`); // Debug log

        const items = await ItemModel.find({ category: categoryId });
        console.log(`Items retrieved: ${items.length}`); // Debug log

        if (!items.length) {
            console.log(`No items found for category ID: ${categoryId}`); // Debug log
            return res.status(404).send({ error: 'No items found for this category' });
        }

        console.log(`Found items for category ID: ${categoryId}:`, items); // Debug log
        res.status(200).send(items);
    } catch (error) {
        console.error("Failed to fetch items:", error); // Debug log
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
