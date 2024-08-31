// tests/controllers/spellController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Spell = require('../../models/spellModel');

describe('Spell Controller', () => {
    let spellId;

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Spell.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new spell', async () => {
        const res = await request(server).post('/api/spell').send({
            name: 'Fireball',
            description: 'Hurls a fiery projectile that explodes on impact, dealing area damage',
            cost: 1139,
            gains: 80,
            faction: 'Human',
            costGainingMultiplier: 1.3,
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('spell');
        expect(res.body.spell.name).toBe('Fireball');

        spellId = res.body.spell._id;
    });

    it('should retrieve all spells', async () => {
        await Spell.create({
            name: 'Fireball',
            description: 'Hurls a fiery projectile that explodes on impact, dealing area damage',
            cost: 1139,
            gains: 80,
            faction: 'Human',
            costGainingMultiplier: 1.3,
        });

        const res = await request(server).get('/api/spell');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('spells');
        expect(Array.isArray(res.body.spells)).toBeTruthy();
        expect(res.body.spells.length).toBe(1);
    });

    it('should retrieve a spell by ID', async () => {
        const spell = await Spell.create({
            name: 'Lightning Bolt',
            description: 'A swift bolt of lightning that strikes a single enemy, dealing high damage',
            cost: 2164,
            gains: 152,
            faction: 'Human',
            costGainingMultiplier: 1.3,
        });

        const res = await request(server).get(`/api/spell/${spell._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('spell');
        expect(res.body.spell.name).toBe('Lightning Bolt');
    });

    it('should update a spell', async () => {
        const spell = await Spell.create({
            name: 'Ice Lance',
            description: 'A piercing shard of ice that pierces through multiple enemies',
            cost: 4112,
            gains: 289,
            faction: 'Human',
            costGainingMultiplier: 1.3,
        });

        const res = await request(server)
            .put(`/api/spell/${spell._id}`)
            .send({ name: 'Updated Spell Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('spell');
        expect(res.body.spell.name).toBe('Updated Spell Name');
    });

    it('should delete a spell', async () => {
        const spell = await Spell.create({
            name: 'Arrow Volley',
            description: 'Unleashes a volley of arrows that rain down on a target area',
            cost: 7812,
            gains: 549,
            faction: 'Human',
            costGainingMultiplier: 1.3,
        });

        const res = await request(server).delete(`/api/spell/${spell._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Spell deleted successfully');

        const deletedSpell = await Spell.findById(spell._id);
        expect(deletedSpell).toBeNull();
    });
});