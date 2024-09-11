// tests/models/soldierModel.test.js
const mongoose = require('mongoose');
const Soldier = require('../../models/soldierModel');

describe('Soldier Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a soldier successfully', async () => {
        const soldierData = {
            name: 'Orc Grunt',
            description: 'Standard melee units.',
            cost: 24954,
            gains: 1479,
            costGainingMultiplier: 1.05,
            faction: 'ORC',
        };

        const validSoldier = new Soldier(soldierData);
        const savedSoldier = await validSoldier.save();

        expect(savedSoldier._id).toBeDefined();
        expect(savedSoldier.name).toBe(soldierData.name);
        expect(savedSoldier.description).toBe(soldierData.description);
    });

    it('should fail to create a soldier without required fields', async () => {
        const soldierWithoutRequiredField = new Soldier({ name: 'Goblin Archer' });
        let err;
        try {
            await soldierWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for update, delete operations, and edge cases as needed
});// tests/soldierModel.test.js
