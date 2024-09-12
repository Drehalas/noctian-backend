const Friend = require('../models/friendModel');

// Get all friends
exports.getAllFriends = async (req, res) => {
    try {
        const friends = await Friend.find();
        res.status(200).json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new friend
exports.createFriend = async (req, res) => {
    const friend = new Friend(req.body);
    try {
        const newFriend = await friend.save();
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a specific friend by ID
exports.getFriendById = async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.id);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });
        res.status(200).json(friend);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a friend by ID
exports.updateFriend = async (req, res) => {
    try {
        const updatedFriend = await Friend.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFriend) return res.status(404).json({ message: 'Friend not found' });
        res.status(200).json(updatedFriend);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a friend by ID
exports.deleteFriend = async (req, res) => {
    try {
        const friend = await Friend.findByIdAndDelete(req.params.id);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });
        res.status(200).json({ message: 'Friend deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
