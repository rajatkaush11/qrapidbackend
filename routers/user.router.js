const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);
router.get('/token/:userId', UserController.getTokenByUserId);
router.get('/users', UserController.getUsers);
router.post('/users', UserController.createOrUpdateUser);

module.exports = router;
