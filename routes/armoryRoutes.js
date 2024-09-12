const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController');

// Create new armory item
router.post('/', armoryController.createArmoryItem);

// Get all armory items
router.get('/', armoryController.getAllArmoryItems);

// Get armory item by ID
router.get('/:id', armoryController.getArmoryItemById);

// Update armory item by ID
router.put('/:id', armoryController.updateArmoryItemById);

// Delete armory item by ID
router.delete('/:id', armoryController.deleteArmoryItemById);

module.exports = router;
