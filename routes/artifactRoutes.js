const express = require('express');
const router = express.Router();
const Artifact = require('../models/artifactModel');

// POST route to create a new artifact
router.post('/', async (req, res) => {
    try {
        const { name, description, cost, gains, costGainingMultiplier, faction, imageUrl, raidIncomePerHour } = req.body;

        const newArtifact = new Artifact({
            name,
            description,
            cost,
            gains,
            costGainingMultiplier,
            faction,
            imageUrl,
            raidIncomePerHour
        });

        await newArtifact.save();
        res.status(201).json({ message: 'Artifact created successfully', artifact: newArtifact });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Artifact name must be unique' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET route to get all artifacts
router.get('/', async (req, res) => {
    try {
        const artifacts = await Artifact.find();
        res.status(200).json(artifacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET route to get an artifact by ID
router.get('/:id', async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (artifact) {
            res.status(200).json(artifact);
        } else {
            res.status(404).json({ message: 'Artifact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// PUT route to update an artifact by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, description, cost, gains, costGainingMultiplier, faction, imageUrl, raidIncomePerHour } = req.body;

        const artifact = await Artifact.findByIdAndUpdate(
            req.params.id,
            { name, description, cost, gains, costGainingMultiplier, faction, imageUrl, raidIncomePerHour },
            { new: true, runValidators: true }
        );

        if (artifact) {
            res.status(200).json({ message: 'Artifact updated successfully', artifact });
        } else {
            res.status(404).json({ message: 'Artifact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// DELETE route to delete an artifact by ID
router.delete('/:id', async (req, res) => {
    try {
        const artifact = await Artifact.findByIdAndDelete(req.params.id);
        if (artifact) {
            res.status(200).json({ message: 'Artifact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Artifact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// POST route to upgrade an artifact
router.post('/upgrade', async (req, res) => {
    try {
        const { userId, id } = req.body;
        const artifact = await Artifact.findById(id);

        if (artifact) {
            // Example upgrade logic: Increase some attribute, e.g., raidIncomePerHour
            artifact.raidIncomePerHour += 10; // Example increment

            await artifact.save();
            res.status(200).json({ message: 'Artifact upgraded successfully', artifact });
        } else {
            res.status(404).json({ message: 'Artifact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
