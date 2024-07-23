// routes/category.router.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const CategoryController = require('../controllers/category.controller');

router.post('/categories', authenticate, CategoryController.createCategory);
router.get('/categories', authenticate, CategoryController.getCategoriesByUser);
router.put('/categories/:id', authenticate, CategoryController.updateCategory);
router.delete('/categories/:id', authenticate, CategoryController.deleteCategory);

module.exports = router;
