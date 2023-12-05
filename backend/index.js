// import dotenv from 'dotenv';
// dotenv.config();
// console.log("Session Secret:", process.env.DSN);
// console.log("Session Secret:", process.env.SESSION_SECRET);


import express from 'express'; 
import { PORT, mongoDBURL, SESSION_SECRET } from './config.js'; 
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { MenuItem } from './models/menuItems.js'; 
import { shopModel } from './models/shopModel.js'; 
import { User } from './models/userModel.js';
import { Order } from './models/cartModel.js'; 
import session from 'express-session';
import cors from 'cors';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', // your frontend server's origin
    credentials: true // this allows session cookies to be sent with requests
}));

app.use(session({
    secret: SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
  }));

  

// app.use(
//     cors({
//         origin: ['https://madeathome11.onrender.com'],
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


app.post('/shopCreation', async (req, res) => {
    try {
        if (
        !req.body.username || 
        !req.body.shopName  || 
        !req.body.description     ||
        !req.body.email ||
        !req.body.phone 
        ) {
            return res.status(400).send({
                message: 'Send all the the required fields',
            });
        }
        const shopItem = {
            username: req.body.username,
            shopName: req.body.shopName,
            description: req.body.description,
            email: req.body.email,
            phone: req.body.phone
        };
        const newShop = await shopModel.create(shopItem); 
        return res.status(201).send(newShop);

        } catch (e) {
            console.log(e.message); 
            res.status(500).send({message: e.message}); 
    }
})


app.get('/myShopDetails', async (req, res) => {
    try {
        const itemsFromShops = await shopModel.find({});
        return res.status(200).json({
            count: itemsFromShops.length,
            data: itemsFromShops
        });

    } catch(e) {
        console.log(e.message); 
        res.status(500).send({message: e.message}); 
    }
})

// function to group the menu items data 
function groupByCuisineAndCategory(data) {
    return data.reduce((acc, item) => {
      // Initialize the cuisine group if it doesn't exist
      if (!acc[item.cuisine]) {
        acc[item.cuisine] = {};
      }
  
      // create the category group within the cuisine if there isn't one 
      if (!acc[item.cuisine][item.category]) {
        acc[item.cuisine][item.category] = [];
      }
  
      // appending the current item to the categry group
      acc[item.cuisine][item.category].push(item);
  
      return acc;
    }, {});
  }


// pulling the memu of a specific shop that is clicked on 

app.get('/menu/:info', async (req, res) => {
    const info = req.params.info;
    console.log("Received info:", info);
    try {

        const menuDetails = await MenuItem.find({shopName: info});
        console.log("Menu Details2:", menuDetails);
        const groupedData = groupByCuisineAndCategory(menuDetails);
        console.log("Updated Menu Details2:", groupedData)

        return res.status(200).json({
            data: groupedData,
        });

    } catch(e) {
        console.log(e.message); 
        res.status(500).send({message: e.message}); 
    }
});


app.post('/register', async (req, res) => {
    console.log("do we get to the register page?")
    try {
    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        hashedPassword: req.body.password
      });
      const savedUser = await user.save();
      res.status(201).send('User created');
    } catch (error) {
      res.status(500).send('Error registering new user');
    }
});

// Handling Login 

app.post('/login', async (req, res) => {
    try {
        // Finding the user by their username 

        const user = await User.findOne({username: req.body.username})
        
        // in case we didn't find any user with that username
        if (!user) {
            return res.status(401).send('Invalid Credentials')
        }

        // now checking the inputted password with the hashed one we have saved 
        const check = await bcrypt.compare(req.body.password, user.hashedPassword)
        
        // if the password is incorrect 
        if (!check) {
            return res.status(401).send('Invalid Credentials')
        }

        // otherwise log the user in 

        req.session.userId = user._id
        console.log('the userId is', req.session.userId)
        console.log("signed in successfully")
        res.send("Logged In Successfully") 
    } catch(e) {
        console.error(e);
        res.status(500).send('We have an error');
    }
}); 
  


// For authenicated pages routing 

function checkAuthenticated(req, res, next) {
    console.log("lets see if the user session saved here",req.session.userId)
    console.log("Session:", req.session);
    if (req.session && req.session.userId) {
        console.log("user is authenthicated")
      return next();
    }
    console.log("user is not authenticated")
    res.status(401).send('Not authenticated');
  }



// middleware to check for user authenthicated 
app.get('/create-shop', checkAuthenticated, (req, res) => {
    console.log("can't access this path until you create an account")
    res.send('This is a protected route');
  });


  
// visiting the store of a specific shop that is clicked on 
app.get('/shops/:info', async (req, res) => {
    const info = req.params.info;
    console.log("Received info:", info);
    try {
        const shopDetails = await shopModel.find({shopName: info});
        console.log("Shop Details:", shopDetails[0]);

        return res.status(200).json({
            data: shopDetails[0],
        });

    } catch(e) {
        console.log(e.message); 
        res.status(500).send({message: e.message}); 
    }
    // Use the captured info as needed
    // res.send(`You entered: ${info}`);
});

app.post('/api/submit-order', async (req, res) => {
    try {
        console.log("we have indeed submitted an order")
        const { shopName, items } = req.body;
        // const username = req.session.username; // Make sure the user is logged in

        // Create a new Order with the username, shopName, and items
        const newOrder = new Order({
            // username,
            shopName,
            items
        });

        // Save the new order to the database
        const savedOrder = await newOrder.save();

        // Respond with success message
        res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order' });
    }
});

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

