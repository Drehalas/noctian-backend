// tests/models/spellModel.test.js
const mongoose = require('mongoose');
const Spell = require('../../models/spellModel');

describe('Spell Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a spell successfully', async () => {
        const spellData = {
            name: 'Fireball',
            description: 'Hurls a fiery projectile that explodes on impact, dealing area damage.',
            cost: 1139,
            gains: 80,
            costGainingMultiplier: 1.3,
            faction: HUMAN,
        };

        const validSpell = new Spell(spellData);
        const savedSpell = await validSpell.save();

        expect(savedSpell._id).toBeDefined();
        expect(savedSpell.name).toBe(spellData.name);
        expect(savedSpell.description).toBe(spellData.description);
    });

    it('should fail to create a spell without required fields', async () => {
        const spellWithoutRequiredField = new Spell({ name: 'Ice Lance' });
        let err;
        try {
            await spellWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for update, delete operations, and edge cases as needed
});// tests/spellModel.test.js
