const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// GET game status
router.get('/status', gameController.getGameStatus);

// POST start new game
router.post('/start', gameController.startNewGame);

// PUT update game settings
router.put('/settings', gameController.updateGameSettings);

// GET leaderboard
router.get('/leaderboard', gameController.getLeaderboard);

module.exports = router;
