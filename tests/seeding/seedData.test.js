const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const seedDatabase = require('../../seedData'); // Adjust the path according to your file structure

const Ladder = require('../../models/ladderModel'); // Adjust the path according to your file structure
const Equipment = require('../../models/equipmentModel'); // Adjust the path according to your file structure
const Soldier = require('../../models/soldierModel'); // Adjust the path according to your file structure
const Spell = require('../../models/spellModel'); // Adjust the path according to your file structure
const Artifact = require('../../models/artifactModel'); // Adjust the path according to your file structure
const Friend = require('../../models/friendModel'); // Adjust the path according to your file structure
const SkillBuff = require('../../models/skillBuffModel'); // Adjust the path according to your file structure

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Database Seeding', () => {
    beforeEach(async () => {
        await Ladder.deleteMany({});
        await Equipment.deleteMany({});
        await Soldier.deleteMany({});
        await Spell.deleteMany({});
        await Artifact.deleteMany({});
        await Friend.deleteMany({});
        await SkillBuff.deleteMany({});
    });

    it('should seed all data without errors', async () => {
        await expect(seedDatabase()).resolves.not.toThrow();

        // Verifying if data is seeded correctly
        const ladders = await Ladder.find();
        const equipment = await Equipment.find();
        const soldiers = await Soldier.find();
        const spells = await Spell.find();
        const artifacts = await Artifact.find();
        const friends = await Friend.find();
        const skillBuffs = await SkillBuff.find();

        expect(ladders.length).toBeGreaterThan(0);
        expect(equipment.length).toBeGreaterThan(0);
        expect(soldiers.length).toBeGreaterThan(0);
        expect(spells.length).toBeGreaterThan(0);
        expect(artifacts.length).toBeGreaterThan(0);
        expect(friends.length).toBeGreaterThan(0);
        expect(skillBuffs.length).toBeGreaterThan(0);
    });
});