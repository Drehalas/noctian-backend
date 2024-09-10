// models/itemModel.js

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    heroItemId: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;