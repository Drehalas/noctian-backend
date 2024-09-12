const Soldier = require('../models/soldierModel');

// Get all soldiers
exports.getAllSoldiers = async (req, res) => {
    try {
        const soldiers = await Soldier.find();
        res.status(200).json(soldiers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific soldier by ID
exports.getSoldierById = async (req, res) => {
    try {
        const soldier = await Soldier.findById(req.params.id);
        if (!soldier) return res.status(404).json({ message: 'Soldier not found' });
        res.status(200).json(soldier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new soldier
exports.createSoldier = async (req, res) => {
    const soldier = new Soldier(req.body);
    try {
        const newSoldier = await soldier.save();
        res.status(201).json(newSoldier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a soldier by ID
exports.updateSoldier = async (req, res) => {
    try {
        const updatedSoldier = await Soldier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSoldier) return res.status(404).json({ message: 'Soldier not found' });
        res.status(200).json(updatedSoldier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a soldier by ID
exports.deleteSoldier = async (req, res) => {
    try {
        const soldier = await Soldier.findByIdAndDelete(req.params.id);
        if (!soldier) return res.status(404).json({ message: 'Soldier not found' });
        res.status(200).json({ message: 'Soldier deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// controllers/soldierController.js

// Upgrade soldier
exports.upgradeSoldier = (req, res) => {
    const { userId, id } = req.body;

    // Validate input
    if (!userId || !id) {
        return res.status(400).json({ error: 'Missing userId or id' });
    }

    // Your upgrade logic here (e.g., update soldier's level, stats, etc.)
    console.log(`Upgrading soldier ${id} for user ${userId}`);

    // Respond with success
    res.status(200).json({ message: 'Soldier upgraded successfully' });
};