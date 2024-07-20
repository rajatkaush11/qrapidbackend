// routers/user.router.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin); // Google login route
router.post('/users', UserController.createOrUpdateUser);

module.exports = router;