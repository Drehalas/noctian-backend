// warThroneModel.js
const mongoose = require('mongoose');

// Define the schema for warList and throneList
const warThroneSchema = new mongoose.Schema({
    warList: [
        {
            id: { type: Number, required: true },
            first: { type: String, required: true },
            second: { type: String, required: true }
        }
    ],
    throneList: [
        {
            faction: { type: String, required: true },
            totalGold: { type: String, required: true }
        }
    ]
});

// Create the model
const WarThrone = mongoose.model('WarThrone', warThroneSchema);

module.exports = WarThrone;
