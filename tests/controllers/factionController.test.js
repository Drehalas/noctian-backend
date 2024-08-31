// tests/controllers/factionController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Faction = require('../../models/factionModel');

describe('Faction Controller', () => {
    let factionId;

    // Setup: connect to a test database before all tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Cleanup: clear the test database after each test
    afterEach(async () => {
        await Faction.deleteMany({});
    });

    // Teardown: disconnect from the test database after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test to create a new faction
    it('should create a new faction', async () => {
        const res = await request(server).post('/api/factions').send({
            name: 'Orc',
            description: 'A fierce and brutal faction known for their strength.',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('faction');
        expect(res.body.faction.name).toBe('Orc');

        factionId = res.body.faction._id; // Store faction ID for later use
    });

    // Test to retrieve all factions
    it('should get all factions', async () => {
        const res = await request(server).get('/api/factions');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('factions');
        expect(Array.isArray(res.body.factions)).toBeTruthy();
    });

    // Test to retrieve a faction by its ID
    it('should get a faction by ID', async () => {
        const faction = await Faction.create({
            name: 'Elf',
            description: 'A wise and magical faction known for their archery skills.',
        });

        const res = await request(server).get(`/api/factions/${faction._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('faction');
        expect(res.body.faction.name).toBe('Elf');
    });

    // Test to update an existing faction
    it('should update an existing faction', async () => {
        const faction = await Faction.create({
            name: 'Undead',
            description: 'A terrifying faction that commands the forces of the dead.',
        });

        const res = await request(server)
            .put(`/api/factions/${faction._id}`)
            .send({ name: 'Updated Faction Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('faction');
        expect(res.body.faction.name).toBe('Updated Faction Name');
    });

    // Test to delete a faction
    it('should delete a faction', async () => {
        const faction = await Faction.create({
            name: 'Demon',
            description: 'A chaotic faction known for their dark powers and magic.',
        });

        const res = await request(server).delete(`/api/factions/${faction._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Faction deleted successfully');

        const deletedFaction = await Faction.findById(faction._id);
        expect(deletedFaction).toBeNull(); // Verify that the faction is deleted from the database
    });
});
