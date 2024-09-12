const SkillBuff = require('../models/skillBuffModel');

// Get skill buffs by userId
exports.getSkillBuffs = async (req, res) => {
    const { userId } = req.query;

    try {
        // Fetch skill buffs associated with the userId
        const skillBuffs = await SkillBuff.find({ userId });

        // Assuming the skillBuffs contain the necessary structure (skills, items, potions, spells)
        const skills = skillBuffs.map(buff => buff.skills);
        const items = skillBuffs.map(buff => buff.items);
        const potions = skillBuffs.map(buff => buff.potions);
        const spells = skillBuffs.map(buff => buff.spells);

        // Return the data as expected by the frontend
        res.status(200).json({ skills, items, potions, spells });
    } catch (error) {
        console.error('Error fetching skill buffs:', error);
        res.status(500).json({ message: 'Failed to fetch skill buffs' });
    }
};

// Upgrade skill buff (leveling up a skill buff)
const upgradeSkillBuff = async (req, res) => {
    const { skillId } = req.body;

    try {
        const skillBuff = await SkillBuff.findById(skillId);
        if (!skillBuff) {
            return res.status(404).json({ message: 'Skill Buff not found' });
        }

        // Upgrade logic: Increase level, recalculate cost, and update total skill gain
        skillBuff.level += 1;
        skillBuff.cost = Math.round(skillBuff.cost * skillBuff.costMultiplier);
        skillBuff.totalSkillGain += skillBuff.gains;

        await skillBuff.save();
        res.status(200).json({ message: 'Skill Buff upgraded successfully', skillBuff });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSkillBuffs, upgradeSkillBuff };
