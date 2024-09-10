// models/itemModel.js

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    rarity: {
        type: String,
        enum: ['Common', 'Rare', 'Epic', 'Legendary'],
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;