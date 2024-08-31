// tests/controllers/friendController.test.js
const request = require('supertest');
const server = require('../../server');
const Friend = require('../../models/friendModel');

describe('Friend Controller', () => {
    let friendId;

    beforeAll(async () => {
        const friend = await Friend.create({ name: 'Peon', faction: 'Orc' });
        friendId = friend._id;
    });

    afterAll(async () => {
        await Friend.deleteMany({});
    });

    it('should return all friends', async () => {
        const res = await request(server).get('/api/friends');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('friends');
        expect(res.body.friends.length).toBeGreaterThan(0);
    });

    it('should add a new friend', async () => {
        const res = await request(server)
            .post('/api/friends')
            .send({ name: 'Squire', faction: 'Human' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('friend');
        expect(res.body.friend.name).toBe('Squire');
    });

    it('should update a friend', async () => {
        const res = await request(server)
            .put(`/api/friends/${friendId}`)
            .send({ name: 'Updated Friend Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('friend');
        expect(res.body.friend.name).toBe('Updated Friend Name');
    });

    it('should delete a friend', async () => {
        const res = await request(server).delete(`/api/friends/${friendId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Friend deleted successfully');
    });
});