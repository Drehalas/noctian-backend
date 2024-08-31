// tests/controllers/skillBuffController.test.js
const request = require('supertest');
const server = require('../../server');
const SkillBuff = require('../../models/skillBuffModel');

describe('Skill Buff Controller', () => {
    let skillId;

    beforeAll(async () => {
        const skill = await SkillBuff.create({
            name: 'Multi Attack',
            description: 'More attacks cost more mana.',
            cost: 100,
            gains: 1,
            level: 0,
            costMultiplier: 1.5,
            totalSkillGain: 1,
        });
        skillId = skill._id;
    });

    afterAll(async () => {
        await SkillBuff.deleteMany({});
    });

    it('should return all skills', async () => {
        const res = await request(server).get('/api/skills');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('skills');
        expect(res.body.skills.length).toBeGreaterThan(0);
    });

    it('should return a single skill by ID', async () => {
        const res = await request(server).get(`/api/skills/${skillId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('skill');
        expect(res.body.skill._id).toBe(skillId.toString());
    });

    it('should create a new skill', async () => {
        const res = await request(server)
            .post('/api/skills')
            .send({
                name: 'Mana Pool',
                description: 'Increase your mana pool.',
                cost: 100,
                gains: 500,
                level: 0,
                costMultiplier: 1.5,
                totalSkillGain: 1000,
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('skill');
        expect(res.body.skill.name).toBe('Mana Pool');
    });

    it('should update an existing skill', async () => {
        const res = await request(server)
            .put(`/api/skills/${skillId}`)
            .send({ name: 'Updated Skill Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('skill');
        expect(res.body.skill.name).toBe('Updated Skill Name');
    });

    it('should delete a skill', async () => {
        const res = await request(server).delete(`/api/skills/${skillId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Skill deleted successfully');
    });
});// tests/controllers/skillBuffController.test.js
