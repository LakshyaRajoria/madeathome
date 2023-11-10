import express from 'express'; 
import { PORT, mongoDBURL } from './config.js'; 
import mongoose from 'mongoose';
import { MenuItem } from './models/menuItems.js'; 
import cors from 'cors';
// import path from 'path'
// import { fileURLToPath } from 'url';
// import './config.mjs';
// import './db.mjs';

// import session from 'express-session';

const app = express();

app.use(express.json());


app.use(cors());
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']    
//     })
// );


// need to make sure to specify in the form that the values for categories, cuisine 
app.post('/menu', async (req, res) => {
    try {
        if (
        !req.body.category || 
        !req.body.cuisine  || 
        !req.body.name     ||
        !req.body.description ||
        !req.body.price
        ) {
            return res.status(400).send({
                message: 'Send all the the required fields',
            });
        }
        const newItem = {
            category: req.body.category,
            cuisine: req.body.cuisine,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        };
        const item = await MenuItem.create(newItem); 
        return res.status(201).send(item);

        } catch (e) {
            console.log(e.message); 
            res.status(500).send({message: e.message}); 
    }
})


app.get('/menu', async (req, res) => {
    try {
        const itemsFromMenu = await MenuItem.find({});
        return res.status(200).json({
            count: itemsFromMenu.length,
            data: itemsFromMenu
        });

    } catch(e) {
        console.log(e.message); 
        res.status(500).send({message: e.message}); 
    }
})

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB: ', err));


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const User = mongoose.model('User');


// app.get('/', (req, res) => {
//     console.log(request)
//     return response.status(234).send("Welcome to MERN Stack Tuttorial")

// })

