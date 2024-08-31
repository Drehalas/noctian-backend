const Spell = require('../models/spellModel');

// Get all spells
exports.getAllSpells = async (req, res) => {
    try {
        const spells = await Spell.find();
        res.status(200).json(spells);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific spell by ID
exports.getSpellById = async (req, res) => {
    try {
        const spell = await Spell.findById(req.params.id);
        if (!spell) return res.status(404).json({ message: 'Spell not found' });
        res.status(200).json(spell);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new spell
exports.createSpell = async (req, res) => {
    const spell = new Spell(req.body);
    try {
        const newSpell = await spell.save();
        res.status(201).json(newSpell);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a spell by ID
exports.updateSpell = async (req, res) => {
    try {
        const updatedSpell = await Spell.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSpell) return res.status(404).json({ message: 'Spell not found' });
        res.status(200).json(updatedSpell);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a spell by ID
exports.deleteSpell = async (req, res) => {
    try {
        const spell = await Spell.findByIdAndDelete(req.params.id);
        if (!spell) return res.status(404).json({ message: 'Spell not found' });
        res.status(200).json({ message: 'Spell deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};