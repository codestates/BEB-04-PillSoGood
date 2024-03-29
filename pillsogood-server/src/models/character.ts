import { model, Schema } from "mongoose";

const character = new Schema({
    userId: String,
    name: String,
    level: Number,
    baseId: String,
    description: String,
    createdAt: String
})

module.exports = model('Character', character); 