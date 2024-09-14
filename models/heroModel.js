const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the hero
    description: { type: String },            // Description of the hero
    cost: { type: Number, required: true },   // Cost to acquire or use the hero
    gains: { type: Number },                  // Gains or benefits provided by the hero
    multiplier: { type: Number, default: 1 }, // Multiplier effect, default is 1
    faction: { type: String, required: true }, // Faction to which the hero belongs
    imageUrl: { type: String, required: false } // New field
});

// Create the model
const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;