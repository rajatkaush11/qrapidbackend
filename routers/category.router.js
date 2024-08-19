const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const CategoryController = require('../controller/category.controller');

// Routes for managing categories
router.post('/category', authenticate, CategoryController.createCategory); // Create a new category
router.get('/categories/:userId', authenticate, CategoryController.getCategoriesByUser); // Get all categories by user ID
router.put('/category/:id', authenticate, CategoryController.updateCategory); // Update a category
router.delete('/category/:id', authenticate, CategoryController.deleteCategory); // Delete a category

module.exports = router;
