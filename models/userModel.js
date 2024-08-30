const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    experience: {
        type: Number,
        default: 0,
    },
    faction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faction',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;