const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const ItemController = require('../controller/item.controller');

router.post('/items', authenticate, upload.single('image'), ItemController.createItem);
router.get('/items/:categoryId', authenticate, ItemController.getItemsByCategory);

module.exports = router;
