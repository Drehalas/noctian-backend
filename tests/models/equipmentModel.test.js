// tests/models/equipmentModel.test.js
const mongoose = require('mongoose');
const Equipment = require('../../models/equipmentModel');

describe('Equipment Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save equipment successfully', async () => {
        const equipmentData = {
            name: 'Sword of Destiny',
            description: 'A sword with untold power.',
            cost: 5000,
            durability: 100,
        };

        const validEquipment = new Equipment(equipmentData);
        const savedEquipment = await validEquipment.save();

        expect(savedEquipment._id).toBeDefined();
        expect(savedEquipment.name).toBe(equipmentData.name);
        expect(savedEquipment.description).toBe(equipmentData.description);
    });

    it('should fail to create equipment without required fields', async () => {
        const equipmentWithoutRequiredField = new Equipment({ name: 'Shield of Valor' });
        let err;
        try {
            await equipmentWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for update and delete operations as needed
});
// tests/equipmentModel.test.js
