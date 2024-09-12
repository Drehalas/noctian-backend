const express = require('express');
const { getHeroByUserId, upgradeHero, getHero} = require('../controllers/heroController');
const router = express.Router();

router.get('/:userId', getHeroByUserId);
router.get('/', getHero);
router.post('/upgrade', upgradeHero);

module.exports = router;
