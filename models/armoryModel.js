const mongoose = require('mongoose');

// Armory Schema
const armorySchema = new mongoose.Schema({
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

// Armory Model
const Armory = mongoose.model('Armory', armorySchema);

module.exports = Armory;