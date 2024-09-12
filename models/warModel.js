const mongoose = require('mongoose');

const WarTimeSchema = new mongoose.Schema({
    nextWarTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WarTime = mongoose.model('WarTime', WarTimeSchema);

module.exports = WarTime;