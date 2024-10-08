require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
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
const armoryRoutes = require('./routes/armoryRoutes');
const warRoutes = require('./routes/warRoutes');
const soldierRoutes = require('./routes/soldierRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');

// Initialize the Express application
const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Existing routes
app.use('/api/faction', factionRoutes);
app.use('/api/spell', spellRoutes);
app.use('/api/soldier', soldierRoutes);
app.use('/api/user', userRoutes);
app.use('/api/userauth', userAuthRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/artifact', artifactRoutes);
app.use('/api/ladder', ladderRoutes);
app.use('/api/skillbuff', skillBuffRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/armory', armoryRoutes);
app.use('/api/war', warRoutes); // Use armory routes

app.get('/', (req, res) => {
    res.send('Hello, Noctian Universe!');
});

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
