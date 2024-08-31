// tests/controllers/gameController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');

describe('Game Controller', () => {
    // Setup: connect to a test database before all tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Teardown: disconnect from the test database after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should start a new game session', async () => {
        const res = await request(server).post('/api/game/start').send({
            userId: '60d21b4667d0d8992e610c85',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('session');
        expect(res.body.session).toHaveProperty('userId', '60d21b4667d0d8992e610c85');
    });

    it('should save game progress', async () => {
        const res = await request(server).post('/api/game/save').send({
            userId: '60d21b4667d0d8992e610c85',
            progress: { level: 5, score: 1000 },
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Game progress saved successfully');
    });

    it('should load game progress', async () => {
        const res = await request(server).get('/api/game/load/60d21b4667d0d8992e610c85');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('progress');
        expect(res.body.progress).toHaveProperty('level');
        expect(res.body.progress).toHaveProperty('score');
    });
});
// tests/controllers/gameController.test.js
