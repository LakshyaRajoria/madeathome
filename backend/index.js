// import dotenv from 'dotenv';
// dotenv.config();
// console.log("Session Secret:", process.env.DSN);
// console.log("Session Secret:", process.env.SESSION_SECRET);


import express from 'express'; 
import { PORT, mongoDBURL, SESSION_SECRET, NODE_ENV} from './config.js'; 
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
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
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoDBURL }),
    cookie: { secure: NODE_ENV === 'production' }
  }));

  

// app.use(
//     cors({
//         origin: ['https://madeathome11.onrender.com'],
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']    
//     })
// );


// need to make sure to specify in the form that the values for categories, cuisine 
app.post('/menu/:info', async (req, res) => {
    const info = req.params.info;
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
            shopName: info, 
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
            username: req.session.username,
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
    console.log("did we properly create user?")
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

        const user = await User.findOne({ username: req.body.username });
        
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
        req.session.username= user.username
        console.log('the userId is', req.session.userId)
        console.log('the username is', req.session.username)
        console.log('the session info here is',req.session)
        console.log("signed in successfully")
        res.send("Logged In Successfully") 
    } catch(e) {
        console.error(e);
        res.status(500).send('We have an error');
    }
}); 

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {

        console.log("we have not been able to log out successfully")
        return res.status(500).send('Could not log out');
      }
      console.log("we have logged out successfully")
      res.send('Logged out successfully');
    });
  });
  

app.get('/authenticate', async (req, res) => {
    console.log("we are on the authentication check page")
    console.log(req.session.userId)
    if (req.session.userId) {
        // const user = await User.find({username: req.session.userId})
        res.json({msg: 'authenticated'})
    } else {
        res.send('false')
    }
})



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
});

app.post('/api/submit-order', async (req, res) => {
    try {
        console.log("we have indeed submitted an order")
        const { shopName, items } = req.body;

        const userId = req.session.userId; 

        // Create a new Order with the userId, shopName, and items
        const newOrder = new Order({
            userId,
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

app.get('/myOrders', async (req, res) => {

    try {

        // first fetching the store name that i create
        let myShopName = await shopModel.find({ username: req.session.username})
        console.log("this is my myShopName", myShopName[0].shopName)
        myShopName = myShopName[0].shopName

        // fetching orders that i might have placed (for other stores)
        const ordersIPlaced = await Order.find({ userId: req.session.userId, shopName: { $ne: myShopName }});
        console.log("the orders that i placed are", ordersIPlaced)

        // fetching the others others have placed for my store 
       
        const shopOrders = await Order.find({ shopName: myShopName});
        console.log("this are my shop orders", shopOrders)

        return res.status(200).json({
            myPlacedOrders: ordersIPlaced,
            myShopOrders: shopOrders
        });



    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('An error occurred while fetching orders.');
    }

})

// Checking to see if logged in user has made a store whose menu they are trying to update 
app.get('/checkStore/:info', async (req, res) => {
    if (req.session.username) {
        try {
            const info = req.params.info; // holds the shopName
            const user = await shopModel.find({username: req.session.username, shopName: info})

            console.log("the result we are looking for is here4", user, user===[])
            const isArrayEmpty = (arr) => Array.isArray(arr) && arr.length === 0;
            if (isArrayEmpty(user)) {
                // User not found

                console.log("this thing is false cmon on")
                res.json({ exists: false});

                
            } else {
                // User  found
                res.json({ exists: true, user: user });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        console.log("there is no username in session")
        res.status(401).send('No username in session');
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



