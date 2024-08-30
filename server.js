require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the MongoDB connection function
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Initialize the Express application
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, Noctian Universe!');
});

// Use the user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});