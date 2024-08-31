const express = require('express');
const router = express.Router();
const soldierController = require('../controllers/soldierController');

// Route to get all soldiers
router.get('/', soldierController.getAllSoldiers);

// Route to create a new soldier
router.post('/', soldierController.createSoldier);

// Route to get a specific soldier by ID
router.get('/:id', soldierController.getSoldierById);

// Route to update a soldier by ID
router.put('/:id', soldierController.updateSoldier);

// Route to delete a soldier by ID
router.delete('/:id', soldierController.deleteSoldier);

module.exports = router;