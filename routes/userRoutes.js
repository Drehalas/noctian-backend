const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create new user data
router.post('/', userController.createUserData);

// Get all user data
router.get('/', userController.getAllUserData);

// Get user data by userId
router.get('/:userId', userController.getUserDataById);

// Update user data by userId
router.put('/:userId', userController.updateUserDataById);

// Delete user data by userId
router.delete('/:userId', userController.deleteUserDataById);

module.exports = router;