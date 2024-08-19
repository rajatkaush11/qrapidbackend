const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const ItemController = require('../controller/item.controller');

// Routes for item management
router.post('/items', authenticate, ItemController.createItem);  // Create a new item
router.get('/items/:categoryId', authenticate, ItemController.getItemsByCategory);  // Get items by category
router.put('/items/:id', authenticate, ItemController.updateItem);  // Update an item by ID
router.delete('/items/:id', authenticate, ItemController.deleteItem);  // Delete an item by ID
router.get('/items/:categoryId/:userId', authenticate, ItemController.getItemsByCategoryAndUser);  // Get items by category and user

module.exports = router;
