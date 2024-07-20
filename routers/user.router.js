const express = require("express");
const router = express.Router();
const UserController = require('../controller/user.controller');

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/token/:userId", UserController.getTokenByUserId);
router.get("/users", UserController.getUsers);

module.exports = router;
