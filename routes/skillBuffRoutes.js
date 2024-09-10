const express = require('express');
const { getSkillBuffs, upgradeSkillBuff } = require('../controllers/skillBuffController');
const router = express.Router();

// Route to get all skill buffs
router.get('/skillbuffs', getSkillBuffs);

// Route to upgrade a skill buff
router.post('/skillbuffs/upgrade', upgradeSkillBuff);

module.exports = router;
