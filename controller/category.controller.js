const CategoryModel = require('../model/category.model');

// Create a new category
const createCategory = async (req, res) => {
    const { name, image, uid } = req.body;

    console.log('Received request:', req.body);

    if (!name || !uid) {
        console.error('Validation error: Category name and restaurant UID are required');
        return res.status(400).send({ error: 'Category name and restaurant UID are required' });
    }

    try {
        const category = new CategoryModel({ name, image, restaurantUid: uid });
        await category.save();
        console.log('Category saved successfully:', category);
        res.status(201).send(category);
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).send({ error: 'Error creating category', details: error.message });
    }
};

// Get categories by restaurant UID
const getCategoriesByRestaurant = async (req, res) => {
    const { uid } = req.params;

    try {
        const categories = await CategoryModel.find({ restaurantUid: uid });
        if (!categories.length) {
            return res.status(404).send({ error: 'No categories found for this restaurant' });
        }
        res.status(200).send(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ error: 'Error fetching categories', details: error.message });
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
        console.error('Error updating category:', error.message);
        res.status(500).send({ error: 'Error updating category', details: error.message });
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
        console.error('Error deleting category:', error.message);
        res.status(500).send({ error: 'Error deleting category', details: error.message });
    }
};

module.exports = {
    createCategory,
    getCategoriesByRestaurant,
    updateCategory,
    deleteCategory,
};
