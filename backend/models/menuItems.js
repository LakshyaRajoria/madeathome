import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    category: {type: String, required: true, unique: true}, 
    cuisine: {type: String, required: true, unique: true}, 
    name: {type: String, required: true, unique: true}, 
    description: {type: String, required: true, unique: true}, 
    price: {type: Number, required: true}, 
})


export const MenuItem = mongoose.model('MenuItem', menuItemSchema);

