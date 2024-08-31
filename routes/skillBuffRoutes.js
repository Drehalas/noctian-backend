const express = require('express');
const router = express.Router();
const skillBuffController = require('../controllers/skillBuffController');

// Route to get all SkillBuffs
router.get('/', skillBuffController.getAllSkillBuffs);

// Route to get a single SkillBuff by ID
router.get('/:id', skillBuffController.getSkillBuffById);

// Route to create a new SkillBuff
router.post('/', skillBuffController.createSkillBuff);

// Route to update a SkillBuff by ID
router.put('/:id', skillBuffController.updateSkillBuff);

// Route to delete a SkillBuff by ID
router.delete('/:id', skillBuffController.deleteSkillBuff);

module.exports = router;