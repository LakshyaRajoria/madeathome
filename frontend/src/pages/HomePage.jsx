import React, { useEffect, useState } from 'react'
import indianCuisine from '../images/Indian.jpg';
import chineseCuisine from '../images/chinese.jpg';
import italianCuisine from '../images/italian.jpg';
import thaiCuisine from '../images/thai.jpg';
import northIndian from '../images/northIndian.jpg';
import southIndian from '../images/southIndian.jpg';
import koreanCuisine from '../images/korean.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';



const HomePage = () => {

    const [shops, setShops] = useState([]); 
    useEffect(() => {
        axios.get(`http://localhost:3000/myShopDetails`)
        .then((response) => {
            setShops(response.data.data);
            console.log("does this pull all my shops for the homepage")
            console.log(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])



    return (
        <div className="font-sans bg-gradient-to-b from-customLight to-customDark">
            <nav className="shadow-md">
                <ul className="flex items-center justify-between p-4">
                    <div className="flex space-x-4">
                        
                        <li>
                            <Link to="/create-shop" className="inline-block bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg">
                                Create Store
                            </Link>
                        </li>
                        <li>
                            <a href="#home-cooks-gallery" className="inline-block bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg">
                                Our Home Cooks
                            </a>
                        </li>
                        <li>
                            <Link to="/myShop" className="inline-block bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg">
                                See Shops List
                            </Link>
                        </li>
                    </div>
                    <li><a href="#create-account" className="text-white text-custom-size font-semibold">Made @ Home</a></li>
                    <div className="flex space-x-4"> 
                        <li>
                            <a href="/login" className="inline-block bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg">
                                Log In
                            </a>
                        </li>
                        <li>
                            <Link to="/register" className="inline-block bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg">
                                Create Account
                            </Link>
                        </li>
                    </div>
                    {/* More nav links */}
                </ul>
            </nav>

            <div id="create-store" className="px-8 py-16">
            <h2 className="text-2xl text-white font-bold mb-8 text-center">Cuisines</h2>
            <div className="flex overflow-hidden">
                <div className="whitespace-nowrap animate-scroll">
                <img src={indianCuisine} alt="Indian Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                <img src={chineseCuisine} alt="Chinese Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                <img src={italianCuisine} alt="Italian Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                <img src={thaiCuisine} alt="Thai Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                {/* Repeat the set for a seamless transition */}
                <img src={indianCuisine} alt="Indian Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                <img src={chineseCuisine} alt="Chinese Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                <img src={italianCuisine} alt="Italian Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                <img src={thaiCuisine} alt="Thai Cuisine" className="inline-block w-1/4 max-w-xs mx-2 rounded-full" />
                {/* Additional images as needed */}
                </div>
            </div>
            </div>
           

            <div id="home-cooks-gallery" className="p-8">
                <h2 className="text-2xl text-white font-bold mb-4 text-center">Our Home Cooks</h2>
                <div className="grid grid-cols-3 gap-4">
                    {/* Repeat for each home cook, query from database */}
                    
                    {shops.map((shop,index) => (

                        <div key={shop._id} className="bg-white p-4 shadow-md rounded-lg">
                            <img className="w-full" src={southIndian}  alt="North Indian" />

                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{shop.shopName}</div>
                                <p className="text-gray-700 text-base">
                                by likaalavida
                                </p>
                                <br />
                                <p className="text-gray-700 text-xs">
                                {shop.description}
                                </p>
                            </div>

                            <div className="px-6 py-4">
                                <Link to={"/shops/" + shop.shopName} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Visit Shop
                                </Link>

                            </div>

                            <div className="px-6 py-4">
                                <Link to="/menu-details" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Visit All Shops
                                </Link>
                            </div>

                            {/* <div className="px-6 pt-4 pb-2"> */}
                                {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> */}
                                {/* <p className="text-sm text-yellow-500">★★★★☆</p> */}
                                {/* </span> */}
                            {/* </div> */}
                            {/* <h3 className="font-semibold">Store Name</h3>
                            <p className="text-sm text-gray-600">Small description of the store.</p>
                            <p className="text-sm text-yellow-500">★★★★☆</p> */}
                        </div>
                    
                    ))}

                    {/* as i keep adding cards here they automatically go to next line and maintain structure */}
                </div>

                
            </div>

            

        </div>
    );
};

export default HomePage;    