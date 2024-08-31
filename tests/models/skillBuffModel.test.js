// tests/models/skillBuffModel.test.js
const mongoose = require('mongoose');
const SkillBuff = require('../../models/skillBuffModel');

describe('SkillBuff Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a skill buff successfully', async () => {
        const skillBuffData = {
            name: 'Multi Attack',
            description: 'With more power comes more responsibility.',
            cost: 100,
            gainings: 1,
            level: 0,
            costMultiplier: 1.5,
            totalSkillGain: 1,
        };

        const validSkillBuff = new SkillBuff(skillBuffData);
        const savedSkillBuff = await validSkillBuff.save();

        expect(savedSkillBuff._id).toBeDefined();
        expect(savedSkillBuff.name).toBe(skillBuffData.name);
        expect(savedSkillBuff.description).toBe(skillBuffData.description);
    });

    it('should fail to create a skill buff without required fields', async () => {
        const skillBuffWithoutRequiredField = new SkillBuff({ name: 'Mana Pool' });
        let err;
        try {
            await skillBuffWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for update and delete operations as needed
});
// tests/skillBuffModel.test.js
