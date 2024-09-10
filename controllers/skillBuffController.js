const SkillBuff = require('../models/skillBuffModel');

// Fetch all skill buffs
const getSkillBuffs = async (req, res) => {
    try {
        const skillBuffs = await SkillBuff.find({});
        res.json(skillBuffs);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

        // Upgrade logic: Increase level and recalculate cost
        skillBuff.level += 1;
        skillBuff.cost = Math.round(skillBuff.cost * skillBuff.costMultiplier);
        skillBuff.totalSkillGain += skillBuff.gains;

        await skillBuff.save();
        res.json({ message: 'Skill Buff upgraded successfully', skillBuff });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSkillBuffs, upgradeSkillBuff };
