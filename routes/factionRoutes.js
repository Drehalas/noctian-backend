const express = require('express');
const router = express.Router();
const factionController = require('../controllers/factionController');

// GET all factions
router.get('/', factionController.getAllFactions);

// GET single faction by ID
router.get('/:id', factionController.getFactionById);

// POST new faction
router.post('/', factionController.createFaction);

// PUT update faction by ID
router.put('/:id', factionController.updateFaction);

// DELETE faction by ID
router.delete('/:id', factionController.deleteFaction);

module.exports = router;
