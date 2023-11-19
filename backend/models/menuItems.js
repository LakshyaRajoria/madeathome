import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    category: {type: String, required: true}, 
    cuisine: {type: String, required: true}, 
    name: {type: String, required: true, unique: true}, 
    description: {type: String, required: true, unique: true}, 
    price: {type: Number, required: true}, 
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export {menuItemSchema, MenuItem}

