const express = require('express');
const router = express.Router();
const spellController = require('../controllers/spellController');

router.get('/', spellController.getAllSpells);
router.post('/', spellController.createSpell);
router.get('/:id', spellController.getSpellById);
router.put('/:id', spellController.updateSpell);
router.delete('/:id', spellController.deleteSpell);
router.post('/upgrade', spellController.upgradeSpell);

module.exports = router;
