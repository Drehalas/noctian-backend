// tests/routes/soldierRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Soldier = require('../../models/soldierModel');

describe('Soldier Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/soldiers', () => {
        it('should fetch all soldiers', async () => {
            const response = await request(server).get('/api/soldiers');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/soldiers', () => {
        it('should create a new soldier', async () => {
            const newSoldier = {
                name: 'Test Soldier',
                description: 'This is a test soldier',
                cost: 500,
                gains: 50,
            };

            const response = await request(server).post('/api/soldiers').send(newSoldier);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Soldier');
        });
    });

    describe('GET /api/soldiers/:id', () => {
        it('should fetch a single soldier by ID', async () => {
            const soldier = new Soldier({
                name: 'Fetch Soldier',
                description: 'Soldier for fetching by ID',
                cost: 300,
                gains: 30,
            });

            await soldier.save();

            const response = await request(server).get(`/api/soldiers/${soldier._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch Soldier');
        });
    });

    describe('PUT /api/soldiers/:id', () => {
        it('should update an existing soldier', async () => {
            const soldier = new Soldier({
                name: 'Update Soldier',
                description: 'Soldier to be updated',
                cost: 400,
                gains: 40,
            });

            await soldier.save();

            const updatedSoldier = {
                name: 'Updated Soldier',
                description: 'This soldier has been updated',
                cost: 450,
                gains: 45,
            };

            const response = await request(server).put(`/api/soldiers/${soldier._id}`).send(updatedSoldier);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated Soldier');
        });
    });

    describe('DELETE /api/soldiers/:id', () => {
        it('should delete an existing soldier', async () => {
            const soldier = new Soldier({
                name: 'Delete Soldier',
                description: 'Soldier to be deleted',
                cost: 350,
                gains: 35,
            });

            await soldier.save();

            const response = await request(server).delete(`/api/soldiers/${soldier._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Soldier deleted successfully');
        });
    });
});
