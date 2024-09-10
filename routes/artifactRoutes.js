const express = require('express');
const router = express.Router();
const Artifact = require('../models/artifactModel');

// POST route to create a new artifact
router.post('/artifacts', async (req, res) => {
    try {
        const { id, name, description, cost, gains, costGainingMultiplier, faction, imageUrl, raidIncomePerHour } = req.body;

        const newArtifact = new Artifact({
            id,
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

module.exports = router;
