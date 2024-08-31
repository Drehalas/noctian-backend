// tests/artifactModel.test.js
// tests/models/artifactModel.test.js
const mongoose = require('mongoose');
const Artifact = require('../../models/artifactModel'); // Adjust the path as needed

describe('Artifact Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save an artifact successfully', async () => {
        const artifactData = {
            name: 'The Crown of the First King',
            description: 'This ancient crown grants enhanced leadership abilities.',
            cost: 19175106,
            gains: 3835021,
            costGainingMultiplier: 2,
            faction: 'Human',
        };

        const validArtifact = new Artifact(artifactData);
        const savedArtifact = await validArtifact.save();

        expect(savedArtifact._id).toBeDefined();
        expect(savedArtifact.name).toBe(artifactData.name);
        expect(savedArtifact.description).toBe(artifactData.description);
    });

    it('should fail to create an artifact without required fields', async () => {
        const artifactWithoutRequiredField = new Artifact({ name: 'The Blade of the Crusader' });
        let err;
        try {
            await artifactWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    // Add more tests for update and delete operations as needed
});