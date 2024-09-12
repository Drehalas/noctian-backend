const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

// Route to get all friends
router.get('/', friendController.getAllFriends);

// Route to create a new friend
router.post('/', friendController.createFriend);

// Route to get a specific friend by ID
router.get('/:id', friendController.getFriendById);

// Route to update a friend by ID
router.put('/:id', friendController.updateFriend);

// Route to delete a friend by ID
router.delete('/:id', friendController.deleteFriend);

module.exports = router;
