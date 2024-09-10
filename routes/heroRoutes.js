const express = require('express');
const { getHeroByUserId, upgradeHero } = require('../controllers/heroController');
const heroController = require('../controllers/heroController');
const router = express.Router();

router.get('/hero/:userId', getHeroByUserId);
router.post('/hero/upgrade', upgradeHero);

module.exports = router;


// GET all equipments
router.get('/', heroController.getAllEquipments);

// GET single equipment by ID
router.get('/:id', heroController.getEquipmentById);

// POST new equipment
router.post('/', heroController.createEquipment);

// PUT update equipment by ID
router.put('/:id', heroController.updateEquipment);

// DELETE equipment by ID
router.delete('/:id', heroController.deleteEquipment);

module.exports = router;