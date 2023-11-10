import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}, 
    homecook:  {type: Boolean, default: false},
    customer:  {type: Boolean, default: false},
})

export const User = mongoose.model('User', UserSchema);