// routes/user.router.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authenticate = require('../middleware/authenticate');

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/token/:userId", UserController.getTokenByUserId);
router.get("/users", UserController.getUsers);
router.get("/restaurant", authenticate, UserController.getRestaurantDetailsByUserId);

module.exports = router;
