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
// Fetch all spells for a user
exports.getSpells = async (req, res) => {
    const { userId } = req.query;

    try {
        // Fetch spells associated with the user
        const spells = await Spell.find({ userId });
        if (!spells.length) {
            return res.status(404).json({ message: 'No spells found for this user.' });
        }

        res.status(200).json(spells);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching spells', error: error.message });
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


// Upgrade a spell
exports.upgradeSpell = async (req, res) => {
    const { userId, id: spellId } = req.body.params;

    try {
        const spell = await Spell.findOne({ _id: spellId, userId });
        if (!spell) {
            return res.status(404).json({ message: 'Spell not found for this user.' });
        }

        // Upgrade logic: Increase level, adjust stats, or perform other upgrades
        spell.level += 1;
        spell.power += spell.powerGain;  // Assuming the spell has a power and powerGain field

        await spell.save();
        res.status(200).json({ message: 'Spell upgraded successfully', spell });
    } catch (error) {
        res.status(500).json({ message: 'Error upgrading spell', error: error.message });
    }
};