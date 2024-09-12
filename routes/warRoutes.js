const express = require('express');
const router = express.Router();
const warController = require('../controllers/warController');

// Route to get the next war time
router.get('/nextwar', warController.getNextWarTime);

module.exports = router;
