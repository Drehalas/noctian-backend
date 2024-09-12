const mongoose = require('mongoose');

// Game-related User schema
const userGameDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',  // Reference to the UserAuth model
        required: true
    },
    incomePerHour: {
        type: Number,
        default: 0
    },
    increaseAmount: {
        type: Number,
        default: 0
    },
    currentGold: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    experience: {
        type: Number,
        default: 0
    },
    avatarImage: {
        type: String,
        default: ''
    },
    exp: {
        type: Number,
        default: 0
    },
    currentMana: {
        type: Number,
        default: 0
    },
    totalMana: {
        type: Number,
        default: 100
    },
    title: {
        type: String,
        default: ''
    },
    factionType: {
        type: String,
        enum: ['ORC', 'HUMAN', 'UNDEAD', 'ANGEL', 'DEMON', 'ELF'],
        required: true,
        immutable: true
    },
    attackCritChance: {
        type: Number
    },
    attackCritIncome: {
        type: Number
    }
});

const UserGameData = mongoose.model('UserGameData', userGameDataSchema);
module.exports = UserGameData;
