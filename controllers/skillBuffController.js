const SkillBuff = require('../models/skillBuffModel'); // Updated import statement

// Get all SkillBuffs
exports.getAllSkillBuffs = async (req, res) => {
    try {
        const skillBuffs = await SkillBuff.find();
        res.status(200).json(skillBuffs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving skill buffs', error });
    }
};

// Get a single SkillBuff by ID
exports.getSkillBuffById = async (req, res) => {
    try {
        const skillBuff = await SkillBuff.findById(req.params.id);
        if (!skillBuff) {
            return res.status(404).json({ message: 'SkillBuff not found' });
        }
        res.status(200).json(skillBuff);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving skill buff', error });
    }
};

// Create a new SkillBuff
exports.createSkillBuff = async (req, res) => {
    try {
        const newSkillBuff = new SkillBuff(req.body);
        await newSkillBuff.save();
        res.status(201).json(newSkillBuff);
    } catch (error) {
        res.status(500).json({ message: 'Error creating skill buff', error });
    }
};

// Update a SkillBuff by ID
exports.updateSkillBuff = async (req, res) => {
    try {
        const updatedSkillBuff = await SkillBuff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSkillBuff) {
            return res.status(404).json({ message: 'SkillBuff not found' });
        }
        res.status(200).json(updatedSkillBuff);
    } catch (error) {
        res.status(500).json({ message: 'Error updating skill buff', error });
    }
};

// Delete a SkillBuff by ID
exports.deleteSkillBuff = async (req, res) => {
    try {
        const deletedSkillBuff = await SkillBuff.findByIdAndDelete(req.params.id);
        if (!deletedSkillBuff) {
            return res.status(404).json({ message: 'SkillBuff not found' });
        }
        res.status(200).json({ message: 'SkillBuff deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting skill buff', error });
    }
};