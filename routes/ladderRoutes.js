const express = require('express');
const router = express.Router();
const ladderController = require('../controllers/ladderController');

// Route to get all ladders
router.get('/', ladderController.getAllLadders);

// Route to create a new ladder entry
router.post('/', ladderController.createLadder);

// Route to get a specific ladder by its ladder ID
router.get('/:id', ladderController.getLadderById);

// Route to get ladder data by user ID
router.get('/user/:userId', ladderController.getLadderByUserId);

// Route to update a specific ladder by ID
router.put('/:id', ladderController.updateLadder);

// Route to delete a ladder by ID
router.delete('/:id', ladderController.deleteLadder);

module.exports = router;