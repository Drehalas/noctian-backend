import mongoose from "mongoose";

const heroUserSchema = new mongoose.Schema({
    heroUserId: Number,
    userId: { type: String, required: true },  // Link hero to a user
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item' // Refers to the Item model
    }]
});

const HeroUser = mongoose.model('HeroUser', heroUserSchema);
