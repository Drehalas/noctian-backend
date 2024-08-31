const express = require('express');
const router = express.Router();
const skillBuffController = require('../controllers/skillBuffController');

// GET all skill buffs
router.get('/', skillBuffController.getAllSkillBuffs);

// GET single skill buff by ID
router.get('/:id', skillBuffController.getSkillBuffById);

// POST new skill buff
router.post('/', skillBuffController.createSkillBuff);

// PUT update skill buff by ID
router.put('/:id', skillBuffController.updateSkillBuff);

// DELETE skill buff by ID
router.delete('/:id', skillBuffController.deleteSkillBuff);

module.exports = router;
