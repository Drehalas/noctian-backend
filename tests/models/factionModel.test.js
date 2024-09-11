// tests/factionModel.test.js
// tests/models/factionModel.test.js
const mongoose = require('mongoose');
const Faction = require('../../models/factionModel');

describe('Faction Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a faction successfully', async () => {
        const factionData = {
            name: 'ORC',
            description: 'A brutish and aggressive faction.',
        };

        const validFaction = new Faction(factionData);
        const savedFaction = await validFaction.save();

        expect(savedFaction._id).toBeDefined();
        expect(savedFaction.name).toBe(factionData.name);
        expect(savedFaction.description).toBe(factionData.description);
    });

    it('should fail to create a faction without required fields', async () => {
        const factionWithoutRequiredField = new Faction({ name: ELF });
        let err;
        try {
            await factionWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for update and delete operations as needed
});
