const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.get('/', friendController.getAllFriends);
router.post('/', friendController.createFriend);
router.get('/:id', friendController.getFriendById);
router.put('/:id', friendController.updateFriend);
router.delete('/:id', friendController.deleteFriend);

module.exports = router;
