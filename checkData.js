// checkData.js

const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust this path if your model is in a different folder

// Connect to MongoDB (replace 'myDatabase' with your database name)
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        // Query all documents in the User collection
        return User.find();
    })
    .then(users => {
        console.log("Users in the database:");
        console.log(users); // Output the array of user objects

        // Close the connection after the query
        return mongoose.connection.close();
    })
    .then(() => {
        console.log("Connection closed");
    })
    .catch(err => {
        console.error("Error:", err);
        mongoose.connection.close(); // Ensure connection closes on error
    });
