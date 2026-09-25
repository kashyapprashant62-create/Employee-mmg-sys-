const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, loginUser } = require("../controllers/userController");

// GET /users — get all users (used by frontend for login)
router.get("/", getAllUsers);

// POST /users — signup
router.post("/", createUser);

// POST /users/login — login with JWT
router.post("/login", loginUser);

module.exports = router;
