const express = require('express');
const { getSkillBuffs, upgradeSkillBuff } = require('../controllers/skillBuffController');
const router = express.Router();

// Route to get skill buffs by userId (update to handle query params properly)
router.get('/skillbuffs', getSkillBuffs);

// Route to upgrade a skill buff (remains unchanged)
router.post('/skillbuffs/upgrade', upgradeSkillBuff);

module.exports = router;
