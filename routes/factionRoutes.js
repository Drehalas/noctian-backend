const express = require('express');
const router = express.Router();
const factionController = require('../controllers/factionController');

router.get('/', factionController.getFaction);
router.get('/:id', factionController.getFactionById);
router.post('/', factionController.createFaction);
router.put('/:id', factionController.updateFaction);
router.delete('/:id', factionController.deleteFaction);

module.exports = router;
