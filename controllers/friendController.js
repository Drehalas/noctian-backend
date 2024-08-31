// controllers/friendController.js

const Friend = require('../models/friendModel');

// Get all friends
exports.getAllFriends = async (req, res) => {
    try {
        const friends = await Friend.find({});
        res.status(200).json(friends);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving friends', error: err.message });
    }
};

// Get a single friend by ID
exports.getFriendById = async (req, res) => {
    try {
        const { id } = req.params;
        const friend = await Friend.findById(id);
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        res.status(200).json(friend);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving friend', error: err.message });
    }
};

// Create a new friend
exports.createFriend = async (req, res) => {
    try {
        const { name, faction } = req.body;
        const newFriend = new Friend({ name, faction });
        await newFriend.save();
        res.status(201).json({ message: 'Friend created successfully', friend: newFriend });
    } catch (err) {
        res.status(500).json({ message: 'Error creating friend', error: err.message });
    }
};

// Update a friend by ID
exports.updateFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, faction } = req.body;
        const updatedFriend = await Friend.findByIdAndUpdate(id, { name, faction }, { new: true });
        if (!updatedFriend) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        res.status(200).json({ message: 'Friend updated successfully', friend: updatedFriend });
    } catch (err) {
        res.status(500).json({ message: 'Error updating friend', error: err.message });
    }
};

// Delete a friend by ID
exports.deleteFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFriend = await Friend.findByIdAndDelete(id);
        if (!deletedFriend) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        res.status(200).json({ message: 'Friend deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting friend', error: err.message });
    }
};