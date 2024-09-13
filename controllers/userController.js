const UserData = require('../models/userModel');

// Create new user data
exports.createUserData = async (req, res) => {
    const { userId, incomePerHour, increaseAmount, currentGold, level, experience, avatarImage, exp, currentMana, totalMana, title, factionType, attackCritChance, attackCritIncome } = req.body;

    try {
        const newUserData = new UserData({
            userId,
            username,
            incomePerHour,
            increaseAmount,
            currentGold,
            level,
            experience,
            avatarImage,
            exp,
            currentMana,
            totalMana,
            title,
            factionType,
            attackCritChance,
            attackCritIncome
        });

        const savedUserData = await newUserData.save();
        res.status(201).json(savedUserData);
    } catch (err) {
        console.error('Error creating user data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all user data
exports.getAllUserData = async (req, res) => {
    try {
        const usersData = await UserData.find();
        res.status(200).json(usersData);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

// Get user data by userId
exports.getUserDataById = async (req, res) => {
    try {
        const userData = await UserData.findOne({ userId: req.params.userId });
        if (!userData) {
            return res.status(404).json({ message: 'User data not found' });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

// Update user data by userId
exports.updateUserDataById = async (req, res) => {
    const { incomePerHour, increaseAmount, currentGold, level, experience, avatarImage, exp, currentMana, totalMana, title, attackCritChance, attackCritIncome } = req.body;

    try {
        const updatedUserData = await UserData.findOneAndUpdate(
            { userId: req.params.userId },
            {
                incomePerHour,
                increaseAmount,
                currentGold,
                level,
                experience,
                avatarImage,
                exp,
                currentMana,
                totalMana,
                title,
                attackCritChance,
                attackCritIncome
            },
            { new: true }
        );

        if (!updatedUserData) {
            return res.status(404).json({ message: 'User data not found' });
        }

        res.status(200).json(updatedUserData);
    } catch (err) {
        console.error('Error updating user data:', err);
        res.status(500).json({ message: 'Error updating user data' });
    }
};

// Delete user data by userId
exports.deleteUserDataById = async (req, res) => {
    try {
        const deletedUserData = await UserData.findOneAndDelete({ userId: req.params.userId });
        if (!deletedUserData) {
            return res.status(404).json({ message: 'User data not found' });
        }
        res.status(200).json({ message: 'User data deleted successfully' });
    } catch (err) {
        console.error('Error deleting user data:', err);
        res.status(500).json({ message: 'Error deleting user data' });
    }
};
