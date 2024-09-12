const express = require('express');
const router = express.Router();
const armoryController = require('../controllers/armoryController'); // Adjust the path as needed

router.get('/', armoryController.getArmories);
router.post('/', armoryController.createArmory);
router.get('/:id', armoryController.getArmoryById);
router.put('/:id', armoryController.updateArmory);
router.delete('/:id', armoryController.deleteArmory);
router.post('/upgrade', armoryController.upgradeArmory);

module.exports = router;
