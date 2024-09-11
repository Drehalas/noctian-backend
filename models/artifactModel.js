const mongoose = require('mongoose');

// Artifact Schema
const artifactSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
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
    },
    raidIncomePerHour: {
        type: Number,
        default: 0
    }
});

// Artifact Model
const Artifact = mongoose.model('Artifact', artifactSchema);

module.exports = Artifact;