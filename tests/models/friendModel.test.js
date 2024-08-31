// tests/models/friendModel.test.js
const mongoose = require('mongoose');
const Friend = require('../../models/friendModel');

describe('Friend Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a friend successfully', async () => {
        const friendData = {
            name: 'Peon',
            faction: 'Orc',
        };

        const validFriend = new Friend(friendData);
        const savedFriend = await validFriend.save();

        expect(savedFriend._id).toBeDefined();
        expect(savedFriend.name).toBe(friendData.name);
        expect(savedFriend.faction).toBe(friendData.faction);
    });

    it('should fail to create a friend without required fields', async () => {
        const friendWithoutRequiredField = new Friend({ name: 'Squire' });
        let err;
        try {
            await friendWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.faction).toBeDefined();
    });

    // Add more tests for update and delete operations as needed
});
