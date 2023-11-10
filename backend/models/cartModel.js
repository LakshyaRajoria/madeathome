import mongoose from "mongoose";
import { MenuItem } from './menuItemModel.js';

const cartSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    shopName: {type: String, required: true}, 
    menuItems: [MenuItem],
})

export const cart = mongoose.model('cart', cartSchema);