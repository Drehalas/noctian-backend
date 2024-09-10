const express = require('express');
const { getHeroByUserId, upgradeHero } = require('../controllers/heroController');
const router = express.Router();

router.get('/hero/:userId', getHeroByUserId);
router.post('/hero/upgrade', upgradeHero);

module.exports = router;