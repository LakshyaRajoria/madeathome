import mongoose from "mongoose";
import { menuItemSchema } from './menuItems.js';

const shopSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    shopName: {type: String, required: true, unique: true}, 
    description: {type: String, required: true, unique: true},
    // email: {type: String, required: true, unique: true}, 
    email: {type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    phone: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {

                return /^\d{10}$/.test(v); // This regex is for a simple 10 digit format
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    // menuItems: [menuItemSchema],
})

export const shopModel = mongoose.model('shopModel', shopSchema);