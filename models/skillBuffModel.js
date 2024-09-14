// models/SkillBuff.js

const mongoose = require('mongoose');

const skillBuffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: String, // Keeping it string to accommodate different formats like "6/6" or "0.7 Ton"
        required: true,
    },
    gains: {
        type: String, // String to accommodate different types like "1", "Restore full mana", "3 per sec"
        required: true,
    },
    level: {
        type: Number,
        default: 0,
    },
    costMultiplier: {
        type: Number,
        default: 1.5,
    },
    totalSkillGain: {
        type: String, // String to accommodate percentage values like "10 %"
    },
    cooldown: {
        type: String, // String to accommodate time formats like "2 hour"
    },
    refresh: {
        type: String, // String to accommodate time formats like "24 hour"
    },
    imageUrl: { type: String, required: false } // New field
});

module.exports = mongoose.model('SkillBuff', skillBuffSchema);