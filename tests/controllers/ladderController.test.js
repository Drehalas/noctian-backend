// tests/controllers/ladderController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Ladder = require('../../models/ladderModel');

describe('Ladder Controller', () => {
    let ladderId;

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Ladder.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new ladder entry', async () => {
        const res = await request(server).post('/api/ladder').send({
            ladderName: 'Great Warchief',
            level: 1,
            faction: 'Orc',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('ladder');
        expect(res.body.ladder.ladderName).toBe('Great Warchief');

        ladderId = res.body.ladder._id;
    });

    it('should retrieve all ladder entries', async () => {
        await Ladder.create({ ladderName: 'Great Warchief', level: 1, faction: 'Orc' });

        const res = await request(server).get('/api/ladder');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ladders');
        expect(Array.isArray(res.body.ladders)).toBeTruthy();
        expect(res.body.ladders.length).toBe(1);
    });

    it('should retrieve a ladder entry by ID', async () => {
        const ladder = await Ladder.create({
            ladderName: 'Warchief',
            level: 2,
            faction: 'Orc',
        });

        const res = await request(server).get(`/api/ladder/${ladder._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ladder');
        expect(res.body.ladder.ladderName).toBe('Warchief');
    });

    it('should update a ladder entry', async () => {
        const ladder = await Ladder.create({
            ladderName: 'High Warlord',
            level: 3,
            faction: 'Orc',
        });

        const res = await request(server)
            .put(`/api/ladder/${ladder._id}`)
            .send({ ladderName: 'Updated Ladder Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ladder');
        expect(res.body.ladder.ladderName).toBe('Updated Ladder Name');
    });

    it('should delete a ladder entry', async () => {
        const ladder = await Ladder.create({
            ladderName: 'Chieftain',
            level: 6,
            faction: 'Orc',
        });

        const res = await request(server).delete(`/api/ladder/${ladder._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Ladder deleted successfully');

        const deletedLadder = await Ladder.findById(ladder._id);
        expect(deletedLadder).toBeNull();
    });
});
