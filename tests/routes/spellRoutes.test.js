// tests/routes/spellRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Spell = require('../../models/spellModel');

describe('Spell Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/spells', () => {
        it('should fetch all spells', async () => {
            const response = await request(server).get('/api/spells');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/spells', () => {
        it('should create a new spell', async () => {
            const newSpell = {
                name: 'Test Spell',
                description: 'This is a test spell',
                cost: 600,
                gains: 60,
            };

            const response = await request(server).post('/api/spells').send(newSpell);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Spell');
        });
    });

    describe('GET /api/spells/:id', () => {
        it('should fetch a single spell by ID', async () => {
            const spell = new Spell({
                name: 'Fetch Spell',
                description: 'Spell for fetching by ID',
                cost: 400,
                gains: 40,
            });

            await spell.save();

            const response = await request(server).get(`/api/spells/${spell._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch Spell');
        });
    });

    describe('PUT /api/spells/:id', () => {
        it('should update an existing spell', async () => {
            const spell = new Spell({
                name: 'Update Spell',
                description: 'Spell to be updated',
                cost: 500,
                gains: 50,
            });

            await spell.save();

            const updatedSpell = {
                name: 'Updated Spell',
                description: 'This spell has been updated',
                cost: 550,
                gains: 55,
            };

            const response = await request(server).put(`/api/spells/${spell._id}`).send(updatedSpell);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated Spell');
        });
    });

    describe('DELETE /api/spells/:id', () => {
        it('should delete an existing spell', async () => {
            const spell = new Spell({
                name: 'Delete Spell',
                description: 'Spell to be deleted',
                cost: 450,
                gains: 45,
            });

            await spell.save();

            const response = await request(server).delete(`/api/spells/${spell._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Spell deleted successfully');
        });
    });
});
