const mongoose = require('mongoose');

// Equipment Schema
const equipmentSchema = new mongoose.Schema({
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

// Equipment Model
const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;