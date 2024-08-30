const mongoose = require('mongoose');

// Artifact Schema
const artifactSchema = new mongoose.Schema({
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

// Artifact Model
const Artifact = mongoose.model('Artifact', artifactSchema);

module.exports = Artifact;