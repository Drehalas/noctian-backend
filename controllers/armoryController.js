const Armory = require('../models/armoryModel');

// Create new armory item
exports.createArmoryItem = async (req, res) => {
    const { name, description, cost, gains, costGainingMultiplier } = req.body;

    try {
        const newArmoryItem = new Armory({
            name,
            description,
            cost,
            gains,
            costGainingMultiplier
        });

        const savedArmoryItem = await newArmoryItem.save();
        res.status(201).json(savedArmoryItem);
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error (unique name)
            return res.status(400).json({ message: 'Armory item with this name already exists' });
        }
        console.error('Error creating armory item:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllArmoryItems = async (req, res) => {
    try {
        const armoryItems = await Armory.find();
        console.log('Armory items fetched:', armoryItems); // Log the fetched data
        res.status(200).json(armoryItems);
    } catch (err) {
        console.error('Error fetching armory items:', err);
        res.status(500).json({ message: 'Error fetching armory items' });
    }
};


// Get armory item by ID
exports.getArmoryItemById = async (req, res) => {
    try {
        const armoryItem = await Armory.findById(req.params.id);
        if (!armoryItem) {
            return res.status(404).json({ message: 'Armory item not found' });
        }
        res.status(200).json(armoryItem);
    } catch (err) {
        console.error('Error fetching armory item:', err);
        res.status(500).json({ message: 'Error fetching armory item' });
    }
};

// Update armory item by ID
exports.updateArmoryItemById = async (req, res) => {
    const { name, description, cost, gains, costGainingMultiplier } = req.body;

    try {
        const updatedArmoryItem = await Armory.findByIdAndUpdate(
            req.params.id,
            { name, description, cost, gains, costGainingMultiplier },
            { new: true }
        );

        if (!updatedArmoryItem) {
            return res.status(404).json({ message: 'Armory item not found' });
        }

        res.status(200).json(updatedArmoryItem);
    } catch (err) {
        console.error('Error updating armory item:', err);
        res.status(500).json({ message: 'Error updating armory item' });
    }
};

// Delete armory item by ID
exports.deleteArmoryItemById = async (req, res) => {
    try {
        const deletedArmoryItem = await Armory.findByIdAndDelete(req.params.id);
        if (!deletedArmoryItem) {
            return res.status(404).json({ message: 'Armory item not found' });
        }
        res.status(200).json({ message: 'Armory item deleted successfully' });
    } catch (err) {
        console.error('Error deleting armory item:', err);
        res.status(500).json({ message: 'Error deleting armory item' });
    }
};
