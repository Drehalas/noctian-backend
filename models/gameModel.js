const mongoose = require('mongoose');

// Define the Game schema
const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active',
    },
});

// Create the Game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;