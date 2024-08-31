const Equipment = require('../models/equipmentModel');

// Get all equipment
exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get specific equipment by ID
exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new equipment
exports.createEquipment = async (req, res) => {
    const equipment = new Equipment(req.body);
    try {
        const newEquipment = await equipment.save();
        res.status(201).json(newEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update equipment by ID
exports.updateEquipment = async (req, res) => {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEquipment) return res.status(404).json({ message: 'Equipment not found' });
        res.status(200).json(updatedEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete equipment by ID
exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        res.status(200).json({ message: 'Equipment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};