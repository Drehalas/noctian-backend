const express = require('express');
const router = express.Router();
const artifactController = require('../controllers/artifactController');

// Route to get all artifacts
router.get('/', artifactController.getAllArtifacts);

// Route to create a new artifact
router.post('/', artifactController.createArtifact);

// Route to get a specific artifact by ID
router.get('/:id', artifactController.getArtifactById);

// Route to update an artifact by ID
router.put('/:id', artifactController.updateArtifact);

// Route to delete an artifact by ID
router.delete('/:id', artifactController.deleteArtifact);

module.exports = router;