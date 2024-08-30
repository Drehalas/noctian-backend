const mongoose = require('mongoose');

// Soldier Schema
const soldierSchema = new mongoose.Schema({
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
        enum: ['Human', 'Undead', 'Angel', 'Demon', 'Elf', 'Orc']
    }
});

// Soldier Model
const Soldier = mongoose.model('Soldier', soldierSchema);

module.exports = Soldier;
