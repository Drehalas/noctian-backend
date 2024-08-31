// tests/models/ladderModel.test.js
const mongoose = require('mongoose');
const Ladder = require('../../models/ladderModel');

describe('Ladder Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a ladder rank successfully', async () => {
        const ladderData = {
            faction: 'Orc',
            rankId: 1,
            rank: 'Great Warchief',
            // Add other relevant fields as per your model
        };

        const validLadderRank = new Ladder(ladderData);
        const savedLadderRank = await validLadderRank.save();

        expect(savedLadderRank._id).toBeDefined();
        expect(savedLadderRank.faction).toBe(ladderData.faction);
        expect(savedLadderRank.rankId).toBe(ladderData.rankId);
        expect(savedLadderRank.rank).toBe(ladderData.rank);
    });

    it('should fail to create a ladder rank without required fields', async () => {
        const ladderWithoutRequiredField = new Ladder({ faction: 'Orc' });
        let err;
        try {
            await ladderWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.rankId).toBeDefined();
        expect(err.errors.rank).toBeDefined();
    });

    // Add more tests for edge cases, such as invalid faction names, rank validations, etc.
});// tests/ladderModel.test.js
