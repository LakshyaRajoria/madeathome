import mongoose from "mongoose";
import { MenuItem } from './menuItemModel.js';

const shopSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    shopName: {type: String, required: true, unique: true}, 
    menuItems: [MenuItem],
})

export const shop = mongoose.model('shop', shopSchema);