const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../server');
const Equipment = require('../../models/equipmentModel');

describe('Equipment Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/equipment', () => {
        it('should fetch all equipment', async () => {
            const response = await request(server).get('/api/equipment');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/equipment', () => {
        it('should create new equipment', async () => {
            const newEquipment = {
                name: 'Test Equipment',
                description: 'This is a test equipment',
                cost: 500,
                gains: 25,
            };

            const response = await request(server).post('/api/equipment').send(newEquipment);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Equipment');
        });
    });

    describe('GET /api/equipment/:id', () => {
        it('should fetch a single equipment by ID', async () => {
            const equipment = new Equipment({
                name: 'Fetch Equipment',
                description: 'Equipment for fetching by ID',
                cost: 300,
                gains: 15,
            });

            await equipment.save();

            const response = await request(server).get(`/api/equipment/${equipment._id}`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Fetch Equipment');
        });
    });

    describe('PUT /api/equipment/:id', () => {
        it('should update an existing equipment', async () => {
            const equipment = new Equipment({
                name: 'Update Equipment',
                description: 'Equipment to be updated',
                cost: 350,
                gains: 18,
            });

            await equipment.save();

            const updatedEquipment = {
                name: 'Updated Equipment',
                description: 'This equipment has been updated',
                cost: 400,
                gains: 20,
            };

            const response = await request(server).put(`/api/equipment/${equipment._id}`).send(updatedEquipment);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Updated Equipment');
        });
    });

    describe('DELETE /api/equipment/:id', () => {
        it('should delete an existing equipment', async () => {
            const equipment = new Equipment({
                name: 'Delete Equipment',
                description: 'Equipment to be deleted',
                cost: 320,
                gains: 16,
            });

            await equipment.save();

            const response = await request(server).delete(`/api/equipment/${equipment._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Equipment deleted successfully');
        });
    });
});
