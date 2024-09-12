const express = require('express');
const router = express.Router();
const { getSkillBuffs, upgradeSkillBuffs } = require('../controllers/skillBuffController');

router.get('/', getSkillBuffs);
router.post('/upgrade', upgradeSkillBuffs);

module.exports = router;