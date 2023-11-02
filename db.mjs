// add your code here!
import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);


const User = new mongoose.Schema({

    username: String, 
    password: String,
    userRoles: Array, 
});


mongoose.model('User', User);

