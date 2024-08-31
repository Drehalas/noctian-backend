const express = require('express');
const router = express.Router();
const ladderController = require('../controllers/ladderController');

// Define your routes
router.get('/', ladderController.getAllLadders);
router.post('/', ladderController.createLadder);
router.get('/:id', ladderController.getLadderById);
router.put('/:id', ladderController.updateLadder);
router.delete('/:id', ladderController.deleteLadder);

module.exports = router;