const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    faction: { type: String, required: true },
    addFriendName: { type: String, required: true }
});
friendSchema.index({ name: 1 }, { unique: false });

module.exports = mongoose.model('Friend', friendSchema);
