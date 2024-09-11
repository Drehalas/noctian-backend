const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Faction = require('../../models/factionModel');

describe('Faction Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/factions', () => {
        it('should fetch all factions', async () => {
            const response = await request(server).get('/api/factions');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/factions', () => {
        it('should create a new faction', async () => {
            const newFaction = {
                name: 'ORC',
                description: 'A fierce and warlike faction',
            };

            const response = await request(server).post('/api/factions').send(newFaction);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('ORC');
        });
    });

    describe('GET /api/factions/:id', () => {
        it('should fetch a single faction by ID', async () => {
            const faction = new Faction({
                name: ELF,
                description: 'A wise and mystical faction',
            });

            await faction.save();

            const response = await request(server).get(`/api/factions/${faction._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(ELF);
        });
    });

    describe('PUT /api/factions/:id', () => {
        it('should update an existing faction', async () => {
            const faction = new Faction({
                name: HUMAN,
                description: 'A faction known for their versatility and resilience',
            });

            await faction.save();

            const updatedFaction = {
                name: 'Human Alliance',
                description: 'The alliance of all human nations',
            };

            const response = await request(server).put(`/api/factions/${faction._id}`).send(updatedFaction);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Human Alliance');
        });
    });

    describe('DELETE /api/factions/:id', () => {
        it('should delete an existing faction', async () => {
            const faction = new Faction({
                name: UNDEAD,
                description: 'A dark and feared faction',
            });

            await faction.save();

            const response = await request(server).delete(`/api/factions/${faction._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Faction deleted successfully');
        });
    });
});
// tests/routes/factionRoutes.test.js
