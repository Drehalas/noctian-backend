const express = require('express');
const router = express.Router();
const { getSkillBuffs, upgradeSkillBuffs } = require('../controllers/skillBuffController');

// Route to get skill buffs
router.get('/skillbuffs', getSkillBuffs);

// Route to upgrade a skill buff
router.post('/skillbuffs/upgrade', upgradeSkillBuffs);

module.exports = router;