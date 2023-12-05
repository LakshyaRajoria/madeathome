import mongoose from "mongoose";
// import { MenuItem } from './menuItemModel.js';

const orderItemSchema = new mongoose.Schema({
    cuisine: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
    // username: { type: String, required: true },
    shopName: { type: String, required: true },
    items: [orderItemSchema],
    placedAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);

