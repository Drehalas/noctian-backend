// controllers/gameController.js
const Game = require('../models/gameModel'); // Make sure you have a Game model defined

// Get all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new game
exports.createGame = async (req, res) => {
    const game = new Game(req.body);
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a game by ID
exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a game by ID
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};