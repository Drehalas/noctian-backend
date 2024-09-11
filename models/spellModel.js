const mongoose = require('mongoose');

// Spell Schema
const spellSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    gains: {
        type: Number,
        required: true
    },
    costGainingMultiplier: {
        type: Number,
        required: true
    },
    faction: {
        type: String,
        required: true,
        enum: ['HUMAN', 'UNDEAD', 'ANGEL', 'DEMON', 'ELF', 'ORC']
    }
});

// Spell Model
const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;