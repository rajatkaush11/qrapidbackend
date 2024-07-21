const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

// Google login route
router.post('/googleLogin', UserController.googleLogin);

// Create or update user with Clerk ID
router.post('/createOrUpdateUser', UserController.createOrUpdateUser);

// Other user-related routes can be added here

module.exports = router;
