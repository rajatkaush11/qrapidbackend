const express = require('express');
const router = express.Router();
const createUserOrUpdate = require('../controllers/user.controller');

router.post('/users', createUserOrUpdate);

module.exports = router;
