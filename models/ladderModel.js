const mongoose = require('mongoose');

// Ladder Schema
const ladderSchema = new mongoose.Schema({
    ladderId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

// Ladder Model
const Ladder = mongoose.model('Ladder', ladderSchema);

module.exports = Ladder;