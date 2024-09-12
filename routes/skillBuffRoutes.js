const express = require('express');
const router = express.Router();
const { getSkillBuffs, upgradeSkillBuffs } = require('../controllers/skillBuffController');

// Route to get skill buffs
router.get('/', getSkillBuffs);

// Route to upgrade a skill buff
router.post('/upgrade', upgradeSkillBuffs);

module.exports = router;