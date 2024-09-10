import mongoose from "mongoose";

const heroUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    gains: {
        type: Number,
        required: true
    },
    costGainingMultiplier: {
        type: Number,
        required: true
    },
    faction: {
        type: String,
        required: true,
        enum: ['Human', 'Undead', 'Angel', 'Demon', 'Elf', 'Orc']
    },
    level: {
        type: Number,
        default: 1,
    },
    experience: {
        type: Number,
        default: 0,
    },
    ItemList:{
        type: String,
        required: true,
        enum: ['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6']
    },
});

const HeroUser = mongoose.model('HeroUser', heroUserSchema);
