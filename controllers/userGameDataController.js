const UserGameData = require('../models/userGameDataModel');

const getUserGameData = async (req, res) => {
    try {
        const userGameData = await UserGameData.findOne({ userId: req.params.userId });
        if (!userGameData) {
            return res.status(404).json({ message: 'User data not found' });
        }
        res.json(userGameData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserGameData };