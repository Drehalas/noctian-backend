const express = require('express');
const router = express.Router();
const spellController = require('../controllers/spellController');

// Route to get all spells
router.get('/', spellController.getAllSpells);

// Route to create a new spell
router.post('/', spellController.createSpell);

// Route to get a specific spell by ID
router.get('/:id', spellController.getSpellById);

// Route to update a spell by ID
router.put('/:id', spellController.updateSpell);

// Route to delete a spell by ID
router.delete('/:id', spellController.deleteSpell);

module.exports = router;
