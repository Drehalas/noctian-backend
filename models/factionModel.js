const mongoose = require('mongoose');

// Define the Faction schema
const factionSchema = new mongoose.Schema({
    factionName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    skills: [{
        type: String,
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

// Create the Faction model
const Faction = mongoose.model('Faction', factionSchema);

module.exports = Faction;