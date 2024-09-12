const UserAuth = require('../models/UserAuthModel.js');

// Create a new user
exports.createUser = async (req, res) => {
    const { userId, username, factionType } = req.body;

    try {
        // Create a new user instance
        const newUser = new UserAuth({
            userId,
            username,
            factionType
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        if (err.code === 11000) { // Handle duplicate key error
            return res.status(400).json({ message: 'User already exists' });
        }
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserAuth.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Get user by userId
exports.getUserById = async (req, res) => {
    try {
        const user = await UserAuth.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Delete user by userId
exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await UserAuth.findOneAndDelete({ userId: req.params.userId });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error deleting user' });
    }
};
