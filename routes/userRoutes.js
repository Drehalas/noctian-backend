const express = require('express');
const { createUser } = require('../controllers/userController');

const router = express.Router();

// Define route for creating a user
router.post('/create', createUser);

module.exports = router;