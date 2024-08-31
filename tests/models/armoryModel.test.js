// tests/models/armoryModel.test.js
const mongoose = require('mongoose');
const Armory = require('../../models/armoryModel');

describe('Armory Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save an armory item successfully', async () => {
        const armoryData = {
            name: 'Warrior Shield',
            description: 'A sturdy shield used by seasoned warriors.',
            cost: 500,
            gains: 10,
            // Add other relevant fields as per your model
        };

        const validArmoryItem = new Armory(armoryData);
        const savedArmoryItem = await validArmoryItem.save();

        expect(savedArmoryItem._id).toBeDefined();
        expect(savedArmoryItem.name).toBe(armoryData.name);
        expect(savedArmoryItem.description).toBe(armoryData.description);
        expect(savedArmoryItem.cost).toBe(armoryData.cost);
        expect(savedArmoryItem.gains).toBe(armoryData.gains);
    });

    it('should fail to create an armory item without required fields', async () => {
        const armoryWithoutRequiredField = new Armory({ name: 'Warrior Shield' });
        let err;
        try {
            await armoryWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for edge cases, such as cost limits, gain calculations, etc.
});// tests/armoryModel.test.js
