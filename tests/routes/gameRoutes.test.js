const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Game = require('../../models/gameModel');

describe('Game Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/games', () => {
        it('should fetch all games', async () => {
            const response = await request(server).get('/api/games');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/games', () => {
        it('should create a new game', async () => {
            const newGame = {
                title: 'War of Factions',
                description: 'A grand strategy game with multiple factions.',
                genre: 'Strategy',
            };

            const response = await request(server).post('/api/games').send(newGame);
            expect(response.status).toBe(201);
            expect(response.body.title).toBe('War of Factions');
        });
    });

    describe('GET /api/games/:id', () => {
        it('should fetch a single game by ID', async () => {
            const game = new Game({
                title: 'Age of Empires',
                description: 'A historical strategy game.',
                genre: 'Strategy',
            });

            await game.save();

            const response = await request(server).get(`/api/games/${game._id}`);
            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Age of Empires');
        });
    });

    describe('PUT /api/games/:id', () => {
        it('should update an existing game', async () => {
            const game = new Game({
                title: 'Civilization',
                description: 'A turn-based strategy game.',
                genre: 'Strategy',
            });

            await game.save();

            const updatedGame = {
                title: 'Civilization VI',
                description: 'The latest in the Civilization series.',
                genre: 'Strategy',
            };

            const response = await request(server).put(`/api/games/${game._id}`).send(updatedGame);
            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Civilization VI');
        });
    });

    describe('DELETE /api/games/:id', () => {
        it('should delete an existing game', async () => {
            const game = new Game({
                title: 'Starcraft',
                description: 'A real-time strategy game.',
                genre: 'RTS',
            });

            await game.save();

            const response = await request(server).delete(`/api/games/${game._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Game deleted successfully');
        });
    });
});
// tests/routes/gameRoutes.test.js
