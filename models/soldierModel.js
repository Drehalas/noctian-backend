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
    gainings: {
        type: Number,
        required: true
    },
    costGainingMultiplier: {
        type: Number,
        required: true
    }
});

// Soldier Model
const Soldier = mongoose.model('Soldier', soldierSchema);

module.exports = Soldier;