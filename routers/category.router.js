const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const CategoryController = require('../controller/category.controller');

router.post('/categories', authenticate, CategoryController.createCategory);

module.exports = router;
