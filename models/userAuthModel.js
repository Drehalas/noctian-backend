const mongoose = require('mongoose');

// Authentication-related User schema
const userAuthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    currentTon: {
        type: Number,
        default: 0
    },
    factionType: {
        type: String,
        enum: ['ORC', 'HUMAN', 'UNDEAD', 'ANGEL', 'DEMON', 'ELF'],
        required: true,
        immutable: true  // Static, cannot change
    },
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema);
module.exports = UserAuth;
