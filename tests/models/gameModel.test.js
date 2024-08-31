// tests/models/gameModel.test.js
const mongoose = require('mongoose');
const Game = require('../../models/gameModel');

describe('Game Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a game successfully', async () => {
        const gameData = {
            name: 'War of Empires',
            genre: 'Strategy',
            developer: 'Empire Games',
        };

        const validGame = new Game(gameData);
        const savedGame = await validGame.save();

        expect(savedGame._id).toBeDefined();
        expect(savedGame.name).toBe(gameData.name);
        expect(savedGame.genre).toBe(gameData.genre);
    });

    it('should fail to create a game without required fields', async () => {
        const gameWithoutRequiredField = new Game({ genre: 'Action' });
        let err;
        try {
            await gameWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });

    // Add more tests for updating game details, deleting, etc.
});
// tests/gameModel.test.js
