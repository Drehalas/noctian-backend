// tests/controllers/userController.test.js
const request = require('supertest');
const server = require('../../server');
const User = require('../../models/userModel');

describe('User Controller', () => {
    let userId;
    let token;

    beforeAll(async () => {
        // Create a test user and get auth token
        const user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });
        userId = user._id;
        token = user.generateAuthToken(); // Assuming you have a method to generate token
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should get the user profile', async () => {
        const res = await request(server)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.username).toBe('testuser');
    });

    it('should update the user profile', async () => {
        const res = await request(server)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.username).toBe('updateduser');
    });

    it('should return all users (admin only)', async () => {
        const res = await request(server)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`); // Assuming token belongs to an admin user

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('users');
        expect(res.body.users.length).toBeGreaterThan(0);
    });

    it('should delete a user (admin only)', async () => {
        const res = await request(server)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('User deleted successfully');
    });
});
// tests/controllers/userController.test.js
