const express = require('express');
const router = express.Router();
const ladderController = require('../controllers/ladderController');

router.get('/', ladderController.getAllLadders);
router.post('/', ladderController.createLadder);
router.get('/:id', ladderController.getLadderById);
router.get('/user/:userId', ladderController.getLadderByUserId);
router.put('/:id', ladderController.updateLadder);
router.delete('/:id', ladderController.deleteLadder);

module.exports = router;