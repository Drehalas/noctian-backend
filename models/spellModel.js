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
    gainings: {
        type: Number,
        required: true
    },
    costGainingMultiplier: {
        type: Number,
        required: true
    }
});

// Spell Model
const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;