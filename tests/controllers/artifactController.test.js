// tests/controllers/artifactController.test.js
// tests/controllers/artifactController.test.js
const request = require('supertest');
const server = require('../../server');
const Artifact = require('../../models/artifactModel');

describe('Artifact Controller', () => {
    let artifactId;

    beforeAll(async () => {
        // Connect to the test database and create a sample artifact
        const artifact = await Artifact.create({
            name: 'The Crown of the First King',
            description: 'This ancient crown grants enhanced leadership abilities.',
            cost: 19175106,
            gains: 3835021,
            costGainingMultiplier: 2,
            faction: 'Human',
        });
        artifactId = artifact._id;
    });

    afterAll(async () => {
        // Clean up the database after tests
        await Artifact.deleteMany({});
    });

    it('should return all artifacts', async () => {
        const res = await request(server).get('/api/artifacts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('artifacts');
        expect(res.body.artifacts.length).toBeGreaterThan(0);
    });

    it('should return a single artifact by ID', async () => {
        const res = await request(server).get(`/api/artifacts/${artifactId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('artifact');
        expect(res.body.artifact._id).toBe(artifactId.toString());
    });

    it('should create a new artifact', async () => {
        const res = await request(server)
            .post('/api/artifacts')
            .send({
                name: 'The Shield of the Defender',
                description: 'This impenetrable shield grants near-invulnerability.',
                cost: 8456221712,
                gains: 1691244342,
                costGainingMultiplier: 2,
                faction: 'Human',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('artifact');
        expect(res.body.artifact.name).toBe('The Shield of the Defender');
    });

    it('should update an existing artifact', async () => {
        const res = await request(server)
            .put(`/api/artifacts/${artifactId}`)
            .send({ name: 'Updated Artifact Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('artifact');
        expect(res.body.artifact.name).toBe('Updated Artifact Name');
    });

    it('should delete an artifact', async () => {
        const res = await request(server).delete(`/api/artifacts/${artifactId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Artifact deleted successfully');
    });
});
