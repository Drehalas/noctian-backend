// controllers/ladderController.js
const Ladder = require('../models/ladderModel');

// Fetch all ladders
exports.getAllLadders = async (req, res) => {
    try {
        const ladders = await Ladder.find();
        res.status(200).json(ladders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a specific ladder by ID
exports.getLadderById = async (req, res) => {
    try {
        const ladder = await Ladder.findById(req.params.id);
        if (!ladder) {
            return res.status(404).json({ message: 'Ladder not found' });
        }
        res.status(200).json(ladder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new ladder
exports.createLadder = async (req, res) => {
    try {
        const newLadder = new Ladder(req.body);
        const savedLadder = await newLadder.save();
        res.status(201).json(savedLadder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a ladder by ID
exports.updateLadder = async (req, res) => {
    try {
        const updatedLadder = await Ladder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLadder) {
            return res.status(404).json({ message: 'Ladder not found' });
        }
        res.status(200).json(updatedLadder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a ladder by ID
exports.deleteLadder = async (req, res) => {
    try {
        const deletedLadder = await Ladder.findByIdAndDelete(req.params.id);
        if (!deletedLadder) {
            return res.status(404).json({ message: 'Ladder not found' });
        }
        res.status(200).json({ message: 'Ladder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};