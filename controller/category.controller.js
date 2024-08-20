const CategoryModel = require('../model/category.model');
const RestaurantModel = require('../model/restaurant.model');

// Create a new category for the specified restaurant UID
const createCategory = async (req, res) => {
    const { name, image, uid } = req.body;

    console.log('Received request:', req.body);

    if (!name || !uid) {
        console.error('Validation error: Category name and restaurant UID are required');
        return res.status(400).send({ error: 'Category name and restaurant UID are required' });
    }

    try {
        // Check if the restaurant UID exists
        const restaurant = await RestaurantModel.findOne({ uid });
        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }

        // Create and save the new category
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
        // Fetch categories associated with the provided restaurant UID
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
    const { name, image, uid } = req.body;

    try {
        // Ensure that the category belongs to the provided restaurant UID
        const category = await CategoryModel.findOneAndUpdate(
            { _id: categoryId, restaurantUid: uid },
            { name, image },
            { new: true }
        );

        if (!category) {
            return res.status(404).send({ error: 'Category not found or does not belong to this restaurant' });
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
    const { uid } = req.body;

    try {
        // Ensure that the category belongs to the provided restaurant UID
        const category = await CategoryModel.findOneAndDelete({ _id: categoryId, restaurantUid: uid });

        if (!category) {
            return res.status(404).send({ error: 'Category not found or does not belong to this restaurant' });
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
