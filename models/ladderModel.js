const mongoose = require('mongoose');

// Ladder Schema
const ladderSchema = new mongoose.Schema({
    ladderId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    faction: {
        type: String,
        required: true,
        enum: ['HUMAN', 'UNDEAD', 'ANGEL', 'DEMON', 'ELF', 'ORC'] // List of all factions
    }
});

// Ladder Model
const Ladder = mongoose.model('Ladder', ladderSchema);

module.exports = Ladder;