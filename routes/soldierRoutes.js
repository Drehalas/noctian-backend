const express = require('express');
const router = express.Router();
const soldierController = require('../controllers/soldierController');

// Existing routes
router.get('/', soldierController.getAllSoldiers);
router.post('/', soldierController.createSoldier);
router.get('/:id', soldierController.getSoldierById);
router.put('/:id', soldierController.updateSoldier);
router.delete('/:id', soldierController.deleteSoldier);

// New route for upgrading a soldier
router.post('/upgrade', soldierController.upgradeSoldier);

module.exports = router;