// tests/routes/friendRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Friend = require('../../models/friendModel');

describe('Friend Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/friends', () => {
        it('should fetch all friends', async () => {
            const response = await request(server).get('/api/friends');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/friends', () => {
        it('should create a new friend', async () => {
            const newFriend = {
                name: 'Test Friend',
                description: 'This is a test friend',
                cost: 200,
                gains: 15,
            };

            const response = await request(server).post('/api/friends').send(newFriend);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Friend');
        });
    });

    describe('GET /api/friends/:id', () => {
        it('should fetch a single friend by ID', async () => {
            const friend = new Friend({
                name: 'Fetch Friend',
                description: 'Friend for fetching by ID',
                cost: 100,
                gains: 5,
            });

            await friend.save();

            const response = await request(server).get(`/api/friends/${friend._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch Friend');
        });
    });

    describe('PUT /api/friends/:id', () => {
        it('should update an existing friend', async () => {
            const friend = new Friend({
                name: 'Update Friend',
                description: 'Friend to be updated',
                cost: 150,
                gains: 10,
            });

            await friend.save();

            const updatedFriend = {
                name: 'Updated Friend',
                description: 'This friend has been updated',
                cost: 180,
                gains: 12,
            };

            const response = await request(server).put(`/api/friends/${friend._id}`).send(updatedFriend);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated Friend');
        });
    });

    describe('DELETE /api/friends/:id', () => {
        it('should delete an existing friend', async () => {
            const friend = new Friend({
                name: 'Delete Friend',
                description: 'Friend to be deleted',
                cost: 120,
                gains: 8,
            });

            await friend.save();

            const response = await request(server).delete(`/api/friends/${friend._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Friend deleted successfully');
        });
    });
});
