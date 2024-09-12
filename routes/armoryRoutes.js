const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController'); // Adjust the path as needed

// Route to get all armories
router.get('/', armoryController.getAllArmories);

// Route to create a new armory
router.post('/', armoryController.createArmory);

// Route to get a specific armory by ID
router.get('/:id', armoryController.getArmoryById);

// Route to update an armory by ID
router.put('/:id', armoryController.updateArmory);

// Route to delete an armory by ID
router.delete('/:id', armoryController.deleteArmory);

// Route to upgrade an armory
router.post('/upgrade', armoryController.upgradeArmory);

module.exports = router;
