const User = require('../models/userModel');

// Function to create a new user
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password,  // In a real app, ensure to hash the password before saving!
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createUser };