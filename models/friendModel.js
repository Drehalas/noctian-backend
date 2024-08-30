const mongoose = require('mongoose');

// Friend Schema
const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Friend Model
const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;