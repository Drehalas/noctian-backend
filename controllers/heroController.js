const Hero = require('../models/heroModel');

// Fetch hero data by userId
exports.getHeroByUserId = async (req, res) => {
    try {
        const hero = await Hero.findOne({ userId: req.params.userId });
        if (!hero) {
            return res.status(404).json({ message: 'Hero not found' });
        }
        res.json(hero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHero = async (req, res) => {
    const { userId } = req.query;

    try {
        const hero = await Hero.find({ userId });
        if (!hero.length) {
            return res.status(404).json({ message: 'No heroes found for this user.' });
        }

        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching armories', error: error.message });
    }
};

exports.upgradeHero = async (req, res) => {
    const { userId, itemId } = req.body;  // Assuming you send the userId and itemId from frontend

    try {
        const hero = await Hero.findOne({ userId });

        if (!hero) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        const item = hero.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.level += 1;
        item.cost = Math.round(item.cost * item.costMultiplier);

        await hero.save();

        res.json({ message: 'Item upgraded successfully', item });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

