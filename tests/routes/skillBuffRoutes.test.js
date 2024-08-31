const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const SkillBuff = require('../../models/skillBuffModel');

describe('Skill & Buff Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/skillbuffs', () => {
        it('should fetch all skills & buffs', async () => {
            const response = await request(server).get('/api/skillbuffs');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/skillbuffs', () => {
        it('should create a new skill or buff', async () => {
            const newSkillBuff = {
                name: 'Test SkillBuff',
                description: 'This is a test skill or buff',
                cost: 300,
                gains: 30,
                level: 1,
                costMultiplier: 1.5,
                totalSkillGain: 10,
                cooldown: '2 hours',
                refresh: '24 hours'
            };

            const response = await request(server).post('/api/skillbuffs').send(newSkillBuff);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test SkillBuff');
        });
    });

    describe('GET /api/skillbuffs/:id', () => {
        it('should fetch a single skill or buff by ID', async () => {
            const skillBuff = new SkillBuff({
                name: 'Fetch SkillBuff',
                description: 'SkillBuff for fetching by ID',
                cost: 150,
                gains: 15,
                level: 2,
                costMultiplier: 1.5,
                totalSkillGain: 20,
                cooldown: '1 hour',
                refresh: '12 hours'
            });

            await skillBuff.save();

            const response = await request(server).get(`/api/skillbuffs/${skillBuff._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch SkillBuff');
        });
    });

    describe('PUT /api/skillbuffs/:id', () => {
        it('should update an existing skill or buff', async () => {
            const skillBuff = new SkillBuff({
                name: 'Update SkillBuff',
                description: 'SkillBuff to be updated',
                cost: 200,
                gains: 20,
                level: 3,
                costMultiplier: 1.5,
                totalSkillGain: 30,
                cooldown: '30 minutes',
                refresh: '6 hours'
            });

            await skillBuff.save();

            const updatedSkillBuff = {
                name: 'Updated SkillBuff',
                description: 'This skill or buff has been updated',
                cost: 250,
                gains: 25,
                level: 4,
                costMultiplier: 1.6,
                totalSkillGain: 40,
                cooldown: '45 minutes',
                refresh: '5 hours'
            };

            const response = await request(server).put(`/api/skillbuffs/${skillBuff._id}`).send(updatedSkillBuff);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated SkillBuff');
        });
    });

    describe('DELETE /api/skillbuffs/:id', () => {
        it('should delete an existing skill or buff', async () => {
            const skillBuff = new SkillBuff({
                name: 'Delete SkillBuff',
                description: 'SkillBuff to be deleted',
                cost: 180,
                gains: 18,
                level: 2,
                costMultiplier: 1.5,
                totalSkillGain: 25,
                cooldown: '1 hour',
                refresh: '8 hours'
            });

            await skillBuff.save();

            const response = await request(server).delete(`/api/skillbuffs/${skillBuff._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('SkillBuff deleted successfully');
        });
    });
});
