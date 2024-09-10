const express = require('express');
const { getHeroByUserId, upgradeHero } = require('../controllers/heroController');
const router = express.Router();

// Fetch hero by user ID
router.get('/hero/:userId', getHeroByUserId);

// Upgrade a specific hero's item
router.post('/hero/upgrade', upgradeHero);

module.exports = router;
