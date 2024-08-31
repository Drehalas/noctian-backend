// tests/controllers/equipmentController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Equipment = require('../../models/equipmentModel');

describe('Equipment Controller', () => {
    let equipmentId;

    // Setup: connect to a test database before all tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Cleanup: clear the test database after each test
    afterEach(async () => {
        await Equipment.deleteMany({});
    });

    // Teardown: disconnect from the test database after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test to create new equipment
    it('should create new equipment', async () => {
        const res = await request(server).post('/api/equipment').send({
            name: 'Melee Weapon',
            description: 'A well-balanced weapon made of quality steel',
            cost: 100,
            gains: 8,
            costGainingMultiplier: 1.2,
            faction: 'Orc',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('equipment');
        expect(res.body.equipment.name).toBe('Melee Weapon');

        equipmentId = res.body.equipment._id; // Store equipment ID for later use
    });

    // Test to retrieve all equipment
    it('should get all equipment', async () => {
        await Equipment.create({
            name: 'Melee Weapon',
            description: 'A well-balanced weapon made of quality steel',
            cost: 100,
            gains: 8,
            costGainingMultiplier: 1.2,
            faction: 'Orc',
        });

        const res = await request(server).get('/api/equipment');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('equipment');
        expect(Array.isArray(res.body.equipment)).toBeTruthy();
        expect(res.body.equipment.length).toBe(1); // Should have 1 equipment
    });

    // Test to retrieve equipment by ID
    it('should get equipment by ID', async () => {
        const equipment = await Equipment.create({
            name: 'Ranged Weapon',
            description: 'A precise long-range weapon crafted for accuracy',
            cost: 150,
            gains: 12,
            costGainingMultiplier: 1.2,
            faction: 'Orc',
        });

        const res = await request(server).get(`/api/equipment/${equipment._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('equipment');
        expect(res.body.equipment.name).toBe('Ranged Weapon');
    });

    // Test to update existing equipment
    it('should update existing equipment', async () => {
        const equipment = await Equipment.create({
            name: 'Off-Hand',
            description: 'A versatile item held in the non-dominant hand for defense or offense',
            cost: 225,
            gains: 18,
            costGainingMultiplier: 1.2,
            faction: 'Orc',
        });

        const res = await request(server)
            .put(`/api/equipment/${equipment._id}`)
            .send({ name: 'Updated Equipment Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('equipment');
        expect(res.body.equipment.name).toBe('Updated Equipment Name');
    });

    // Test to delete equipment
    it('should delete equipment', async () => {
        const equipment = await Equipment.create({
            name: 'Chest Armor',
            description: 'Sturdy protection for the torso, forged from durable materials',
            cost: 338,
            gains: 27,
            costGainingMultiplier: 1.2,
            faction: 'Orc',
        });

        const res = await request(server).delete(`/api/equipment/${equipment._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Equipment deleted successfully');

        const deletedEquipment = await Equipment.findById(equipment._id);
        expect(deletedEquipment).toBeNull(); // Verify that the equipment is deleted from the database
    });
});
