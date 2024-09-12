const express = require('express');
const userContoller = require('../controllers/userController');

const router = express.Router();

router.get('/', userContoller.getAllUsers);
router.get('/:id', userContoller.getUserById);
router.get('/user/:userId', userContoller.getUserById);
router.put('/:id', userContoller.updateUser);
router.delete('/:id', userContoller.deleteUser);

module.exports = router;