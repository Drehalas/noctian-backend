// tests/models/userModel.test.js
const mongoose = require('mongoose');
const User = require('../../models/userModel');

describe('User Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a user successfully', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        };

        const validUser = new User(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
    });

    it('should fail to create a user without required fields', async () => {
        const userWithoutRequiredField = new User({ email: 'nousername@example.com' });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.username).toBeDefined();
    });

    // Add more tests for password hashing, authentication, etc.
});
// tests/userModel.test.js
