// tests/routes/userRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const User = require('../../models/modelCombinations/userModel');

describe('User Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/users', () => {
        it('should fetch all users', async () => {
            const response = await request(server).get('/api/users');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const newUser = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const response = await request(server).post('/api/users').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body.username).toBe('testuser');
        });
    });

    describe('GET /api/users/:id', () => {
        it('should fetch a single user by ID', async () => {
            const user = new User({
                username: 'fetchuser',
                email: 'fetchuser@example.com',
                password: 'password123',
            });

            await user.save();

            const response = await request(server).get(`/api/users/${user._id}`);
            expect(response.status).toBe(200);
            expect(response.body.username).toBe('fetchuser');
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update an existing user', async () => {
            const user = new User({
                username: 'updateuser',
                email: 'updateuser@example.com',
                password: 'password123',
            });

            await user.save();

            const updatedUser = {
                username: 'updateduser',
                email: 'updateduser@example.com',
                password: 'newpassword123',
            };

            const response = await request(server).put(`/api/users/${user._id}`).send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body.username).toBe('updateduser');
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete an existing user', async () => {
            const user = new User({
                username: 'deleteuser',
                email: 'deleteuser@example.com',
                password: 'password123',
            });

            await user.save();

            const response = await request(server).delete(`/api/users/${user._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('User deleted successfully');
        });
    });
});
