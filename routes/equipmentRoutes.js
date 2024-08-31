const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// GET all equipments
router.get('/', equipmentController.getAllEquipments);

// GET single equipment by ID
router.get('/:id', equipmentController.getEquipmentById);

// POST new equipment
router.post('/', equipmentController.createEquipment);

// PUT update equipment by ID
router.put('/:id', equipmentController.updateEquipment);

// DELETE equipment by ID
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
