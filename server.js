require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the MongoDB connection function
const userRoutes = require('./routes/userRoutes');
const factionRoutes = require('./routes/factionRoutes');
const spellRoutes = require('./routes/spellRoutes');
const friendRoutes = require('./routes/friendRoutes');
const ladderRoutes = require('./routes/ladderRoutes');
const skillBuffRoutes = require('./routes/skillBuffRoutes');
const artifactRoutes = require('./routes/artifactRoutes');
const heroRoutes = require('./routes/heroRoutes');
const armoryRoutes = require('./routes/armoryRoutes'); // Import armory routes

// Initialize the Express application
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Existing routes
app.use('/api/factions', factionRoutes);
app.use('/api/spell', spellRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/artifacts', artifactRoutes);
app.use('/api/ladderRoutes', ladderRoutes);
app.use('/api/skillbuffs', skillBuffRoutes);
app.use('/api/hero', heroRoutes);

// Add armory routes
app.use('/api/armories', armoryRoutes); // Use armory routes

app.get('/', (req, res) => {
    res.send('Hello, Noctian Universe!');
});

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
