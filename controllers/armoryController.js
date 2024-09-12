const Armory = require('../models/armoryModel'); // Adjust the path as needed

// Get all armories
exports.getAllArmories = async (req, res) => {
    try {
        const armories = await Armory.find();
        res.status(200).json(armories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new armory
exports.createArmory = async (req, res) => {
    const { name, description, cost, gains, costGainingMultiplier } = req.body;

    try {
        const newArmory = new Armory({ name, description, cost, gains, costGainingMultiplier });
        await newArmory.save();
        res.status(201).json(newArmory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific armory by ID
exports.getArmoryById = async (req, res) => {
    try {
        const armory = await Armory.findById(req.params.id);
        if (armory) {
            res.status(200).json(armory);
        } else {
            res.status(404).json({ error: 'Armory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an armory by ID
exports.updateArmory = async (req, res) => {
    const { name, description, cost, gains, costGainingMultiplier } = req.body;

    try {
        const armory = await Armory.findByIdAndUpdate(
            req.params.id,
            { name, description, cost, gains, costGainingMultiplier },
            { new: true, runValidators: true }
        );

        if (armory) {
            res.status(200).json(armory);
        } else {
            res.status(404).json({ error: 'Armory not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an armory by ID
exports.deleteArmory = async (req, res) => {
    try {
        const armory = await Armory.findByIdAndDelete(req.params.id);

        if (armory) {
            res.status(200).json({ message: 'Armory deleted successfully' });
        } else {
            res.status(404).json({ error: 'Armory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Upgrade an armory
exports.upgradeArmory = async (req, res) => {
    const { userId, id } = req.body;

    // Here you might have additional logic for upgrading based on user or armory state
    try {
        const armory = await Armory.findById(id);

        if (armory) {
            // Example upgrade logic: Increase the gains and cost multiplier
            armory.gains += 10; // Example increment
            armory.costGainingMultiplier += 0.1; // Example increment

            await armory.save();
            res.status(200).json({ message: 'Armory upgraded successfully', armory });
        } else {
            res.status(404).json({ error: 'Armory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
