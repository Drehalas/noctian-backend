// tests/routes/artifactRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Artifact = require('../../models/artifactModel');

describe('Artifact Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/artifacts', () => {
        it('should fetch all artifacts', async () => {
            const response = await request(server).get('/api/artifacts');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/artifacts', () => {
        it('should create a new artifact', async () => {
            const newArtifact = {
                name: 'Test Artifact',
                description: 'This is a test artifact',
                cost: 2000,
                gains: 100,
            };

            const response = await request(server).post('/api/artifacts').send(newArtifact);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Artifact');
        });
    });

    describe('GET /api/artifacts/:id', () => {
        it('should fetch a single artifact by ID', async () => {
            const artifact = new Artifact({
                name: 'Fetch Artifact',
                description: 'Artifact for fetching by ID',
                cost: 1500,
                gains: 70,
            });

            await artifact.save();

            const response = await request(server).get(`/api/artifacts/${artifact._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch Artifact');
        });
    });

    describe('PUT /api/artifacts/:id', () => {
        it('should update an existing artifact', async () => {
            const artifact = new Artifact({
                name: 'Update Artifact',
                description: 'Artifact to be updated',
                cost: 1700,
                gains: 80,
            });

            await artifact.save();

            const updatedArtifact = {
                name: 'Updated Artifact',
                description: 'This artifact has been updated',
                cost: 1800,
                gains: 90,
            };

            const response = await request(server).put(`/api/artifacts/${artifact._id}`).send(updatedArtifact);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated Artifact');
        });
    });

    describe('DELETE /api/artifacts/:id', () => {
        it('should delete an existing artifact', async () => {
            const artifact = new Artifact({
                name: 'Delete Artifact',
                description: 'Artifact to be deleted',
                cost: 1600,
                gains: 85,
            });

            await artifact.save();

            const response = await request(server).delete(`/api/artifacts/${artifact._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Artifact deleted successfully');
        });
    });
});