const HeroEquipment = require('../models/heroEquipmentModel');

const getHeroEquipment = async (req, res) => {
    try {
        const heroEquipment = await HeroEquipment.find({ userId: req.params.userId });
        res.json(heroEquipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHeroEquipment };
