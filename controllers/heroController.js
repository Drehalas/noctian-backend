export let deleteEquipment = undefined;
export let updateEquipment = undefined;
export let createEquipment = undefined;
export let getEquipmentById = undefined;
export let getAllEquipments = undefined;
const Hero = require('../models/heroModel');

// Get hero details for a specific user
exports.getHeroByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Fetch hero details from the database
        const heroDetails = await Hero.findOne({ userId });
        if (!heroDetails) {
            return res.status(404).json({ message: 'Hero not found' });
        }
        res.status(200).json(heroDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upgrade hero equipment or stats
exports.upgradeHero = async (req, res) => {
    try {
        const { heroId, upgradeType } = req.body;  // assuming you're sending heroId and upgradeType
        // Logic to upgrade the hero item, for example:
        const hero = await Hero.findById(heroId);
        if (!hero) {
            return res.status(404).json({ message: 'Hero not found' });
        }
        // Perform the upgrade logic
        hero.upgrade(upgradeType);
        await hero.save();
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};