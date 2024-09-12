const Artifact = require('../models/artifactModel');

// Get all artifacts
exports.getAllArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find();
        res.status(200).json(artifacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific artifact by ID
exports.getArtifactById = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (!artifact) return res.status(404).json({ message: 'Artifact not found' });
        res.status(200).json(artifact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new artifact
exports.createArtifact = async (req, res) => {
    try {
        const { name, description, cost, gains, costGainingMultiplier, faction } = req.body;
        const newArtifact = new Artifact({
            name,
            description,
            cost,
            gains,
            costGainingMultiplier,
            faction,
        });
        await newArtifact.save();
        res.status(201).json({ message: 'Artifact created successfully', artifact: newArtifact });
    } catch (err) {
        res.status(500).json({ message: 'Error creating artifact', error: err.message });
    }
};

// Update an artifact by ID
exports.updateArtifact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, cost, gains, costGainingMultiplier, faction } = req.body;
        const updatedArtifact = await Artifact.findByIdAndUpdate(
            id,
            { name, description, cost, gains, costGainingMultiplier, faction },
            { new: true }
        );
        if (!updatedArtifact) {
            return res.status(404).json({ message: 'Artifact not found' });
        }
        res.status(200).json({ message: 'Artifact updated successfully', artifact: updatedArtifact });
    } catch (err) {
        res.status(500).json({ message: 'Error updating artifact', error: err.message });
    }
};

// Delete an artifact by ID
exports.deleteArtifact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArtifact = await Artifact.findByIdAndDelete(id);
        if (!deletedArtifact) {
            return res.status(404).json({ message: 'Artifact not found' });
        }
        res.status(200).json({ message: 'Artifact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting artifact', error: err.message });
    }
};

// Upgrade an artifact
exports.upgradeArtifact = async (req, res) => {
    try {
        const { userId, id } = req.body; // `userId` can be used for authorization or tracking
        const artifact = await Artifact.findById(id);

        if (!artifact) {
            return res.status(404).json({ message: 'Artifact not found' });
        }

        // Example upgrade logic: Increase some attribute
        artifact.gains += 10; // Example increment, adjust as needed

        await artifact.save();
        res.status(200).json({ message: 'Artifact upgraded successfully', artifact });
    } catch (err) {
        res.status(500).json({ message: 'Error upgrading artifact', error: err.message });
    }
};
