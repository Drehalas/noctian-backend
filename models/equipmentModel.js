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
    gainings: {
        type: Number,
        required: true
    },
    costGainingMultiplier: {
        type: Number,
        required: true
    }
});

// Equipment Model
const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;