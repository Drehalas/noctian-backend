// controllers/factionController.js
const Faction = require('../models/factionModel');

// Get all factions
exports.getAllFactions = async (req, res) => {
    try {
        const factions = await Faction.find();
        res.status(200).json(factions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFaction = async (req, res) => {
    const { userId } = req.query;

    try {
        const faction = await Faction.find({ userId });
        if (!faction.length) {
            return res.status(404).json({ message: 'No faction found for this user.' });
        }

        res.status(200).json(faction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching factions', error: error.message });
    }
};

// Get a specific faction by ID
exports.getFactionById = async (req, res) => {
    try {
        const faction = await Faction.findById(req.params.id);
        if (!faction) return res.status(404).json({ message: 'Faction not found' });
        res.status(200).json(faction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new faction
exports.createFaction = async (req, res) => {
    const faction = new Faction(req.body);
    try {
        const newFaction = await faction.save();
        res.status(201).json(newFaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a faction by ID
exports.updateFaction = async (req, res) => {
    try {
        const updatedFaction = await Faction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFaction) return res.status(404).json({ message: 'Faction not found' });
        res.status(200).json(updatedFaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a faction by ID
exports.deleteFaction = async (req, res) => {
    try {
        const faction = await Faction.findByIdAndDelete(req.params.id);
        if (!faction) return res.status(404).json({ message: 'Faction not found' });
        res.status(200).json({ message: 'Faction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};