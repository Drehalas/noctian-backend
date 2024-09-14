const express = require('express');
const router = express.Router();
const warThroneController = require('../controllers/warThroneController');

router.post('/', warThroneController.createWarThrone);
router.get('/:id', warThroneController.getWarThroneById);
router.put('/:id', warThroneController.updateWarThroneById);
router.delete('/:id', warThroneController.deleteWarThroneById);
router.get('/', warThroneController.getAllWarThroneData);

module.exports = router;
