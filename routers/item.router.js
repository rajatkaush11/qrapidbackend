const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const ItemController = require('../controller/item.controller');

router.post('/items', authenticate, ItemController.createItem);
router.get('/items/:categoryId', authenticate, ItemController.getItemsByCategory);
router.put('/items/:id', authenticate, ItemController.updateItem);
router.delete('/items/:id', authenticate, ItemController.deleteItem);

module.exports = router;
