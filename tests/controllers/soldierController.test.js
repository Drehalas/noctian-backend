// tests/controllers/soldierController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Soldier = require('../../models/soldierModel');

describe('Soldier Controller', () => {
    let soldierId;

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Soldier.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new soldier', async () => {
        const res = await request(server).post('/api/soldier').send({
            name: 'Orc Grunt',
            description: 'Standard melee units.',
            cost: 24954,
            gains: 1479,
            faction: 'Orc',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('soldier');
        expect(res.body.soldier.name).toBe('Orc Grunt');

        soldierId = res.body.soldier._id;
    });

    it('should retrieve all soldiers', async () => {
        await Soldier.create({
            name: 'Orc Grunt',
            description: 'Standard melee units.',
            cost: 24954,
            gains: 1479,
            faction: 'Orc',
        });

        const res = await request(server).get('/api/soldier');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('soldiers');
        expect(Array.isArray(res.body.soldiers)).toBeTruthy();
        expect(res.body.soldiers.length).toBe(1);
    });

    it('should retrieve a soldier by ID', async () => {
        const soldier = await Soldier.create({
            name: 'Orc Spearman',
            description: 'Effective against infantry.',
            cost: 66127,
            gains: 3921,
            faction: 'Orc',
        });

        const res = await request(server).get(`/api/soldier/${soldier._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('soldier');
        expect(res.body.soldier.name).toBe('Orc Spearman');
    });

    it('should update a soldier', async () => {
        const soldier = await Soldier.create({
            name: 'Orc Axeman',
            description: 'High damage melee units.',
            cost: 175237,
            gains: 10390,
            faction: 'Orc',
        });

        const res = await request(server)
            .put(`/api/soldier/${soldier._id}`)
            .send({ name: 'Updated Soldier Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('soldier');
        expect(res.body.soldier.name).toBe('Updated Soldier Name');
    });

    it('should delete a soldier', async () => {
        const soldier = await Soldier.create({
            name: 'Orc Hunter',
            description: 'High ranged damage.',
            cost: 464378,
            gains: 27532,
            faction: 'Orc',
        });

        const res = await request(server).delete(`/api/soldier/${soldier._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Soldier deleted successfully');

        const deletedSoldier = await Soldier.findById(soldier._id);
        expect(deletedSoldier).toBeNull();
    });
});
