const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');

// Route to create a new user
router.post('/', userAuthController.createUser);

// Route to get all users
router.get('/', userAuthController.getAllUsers);

// Route to get a user by userId
router.get('/:userId', userAuthController.getUserById);

// Route to delete a user by userId
router.delete('/:userId', userAuthController.deleteUserById);

module.exports = router;