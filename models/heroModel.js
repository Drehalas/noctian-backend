const mongoose = require('mongoose');

// Define a schema for individual items (equipment)
const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    gains: { type: Number, required: true },
    level: { type: Number, default: 0 },
    costMultiplier: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    raidIncomePerHour: { type: Number, default: 0 },
});

// Define the main Hero schema
const heroSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // Link hero to a user
    factionType: { type: String, required: true },
    currentGold: { type: Number, required: true },
    items: [equipmentSchema],  // Array of equipment/items the hero has
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;