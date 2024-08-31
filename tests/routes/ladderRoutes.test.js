// tests/routes/ladderRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Ladder = require('../../models/ladderModel');

describe('Ladder Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/ladders', () => {
        it('should fetch all ladders', async () => {
            const response = await request(server).get('/api/ladders');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/ladders', () => {
        it('should create a new ladder', async () => {
            const newLadder = {
                name: 'Test Ladder',
                description: 'This is a test ladder',
                rank: 1,
                points: 100,
            };

            const response = await request(server).post('/api/ladders').send(newLadder);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Ladder');
        });
    });

    describe('GET /api/ladders/:id', () => {
        it('should fetch a single ladder by ID', async () => {
            const ladder = new Ladder({
                name: 'Fetch Ladder',
                description: 'Ladder for fetching by ID',
                rank: 2,
                points: 200,
            });

            await ladder.save();

            const response = await request(server).get(`/api/ladders/${ladder._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch Ladder');
        });
    });

    describe('PUT /api/ladders/:id', () => {
        it('should update an existing ladder', async () => {
            const ladder = new Ladder({
                name: 'Update Ladder',
                description: 'Ladder to be updated',
                rank: 3,
                points: 300,
            });

            await ladder.save();

            const updatedLadder = {
                name: 'Updated Ladder',
                description: 'This ladder has been updated',
                rank: 4,
                points: 400,
            };

            const response = await request(server).put(`/api/ladders/${ladder._id}`).send(updatedLadder);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated Ladder');
        });
    });

    describe('DELETE /api/ladders/:id', () => {
        it('should delete an existing ladder', async () => {
            const ladder = new Ladder({
                name: 'Delete Ladder',
                description: 'Ladder to be deleted',
                rank: 5,
                points: 500,
            });

            await ladder.save();

            const response = await request(server).delete(`/api/ladders/${ladder._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Ladder deleted successfully');
        });
    });
});
