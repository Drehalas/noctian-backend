const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// Route to get all equipment
router.get('/', equipmentController.getAllEquipment);

// Route to create new equipment
router.post('/', equipmentController.createEquipment);

// Route to get a specific equipment by ID
router.get('/:id', equipmentController.getEquipmentById);

// Route to update equipment by ID
router.put('/:id', equipmentController.updateEquipment);

// Route to delete equipment by ID
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;