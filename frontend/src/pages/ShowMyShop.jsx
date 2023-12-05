import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';


const ShowMyShop = () => {
    const { shopName } = useParams();
    console.log("Shop Name:", shopName);
    const [shopData, setShopData] = useState(null);
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});

    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const shopResponse = await axios.get(`http://localhost:3000/shops/${shopName}`);
                setShopData(shopResponse.data.data);
    
                const menuResponse = await axios.get(`http://localhost:3000/menu/${shopName}`);
                setMenuData(menuResponse.data.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [shopName]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Function to handle incrementing item quantity
    const incrementQuantity = (cuisine, category, itemName) => {
        const key = `${cuisine}-${category}-${itemName}`;
        setQuantities(prevQuantities => ({
        ...prevQuantities,
        [key]: (prevQuantities[key] || 0) + 1
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
      
        // Prepare the data for submission
        const orderData = {
            shopName, // Include the shopName in the order data
            items: Object.entries(quantities).map(([key, quantity]) => {
              const [cuisine, category, name] = key.split('-');
              return { cuisine, category, name, quantity };
            }).filter(item => item.quantity > 0)
          };
      
      
        // Send the order to the server
        try {
            const response = await axios.post('http://localhost:3000/api/submit-order', orderData, { withCredentials: true });
            console.log(response.data); // Handle the response
            // Perform any additional actions on success, e.g., redirecting or showing a confirmation message
          } catch (error) {
              console.log("we get an error here")
            console.error('Error submitting order:', error);
            // Handle errors, e.g., showing an error message to the user
          }
      };


    return (
            <>
            <nav className="shadow-md">
                <ul className="flex items-center justify-between p-4">
                    <div className="flex space-x-4">
                        
                        
                    <li><a href="/" className="text-black text-custom-size font-semibold">Made @ Home</a></li>
                        
                    </div>
                    <li><a href="#create-account" className="text-white text-custom-size font-semibold">Made @ Home</a></li>
                </ul>
            </nav>

            <div className="shadow-md" style={{ textAlign: 'left', padding: '20px' }}>
                <h1 className="text-3xl">{shopName}</h1>
                <p class="text-gray-500">
                    {shopData.description}
                </p>
                <p class="text-gray-500">
                    {shopData.email}
                </p>
                <p class="text-gray-500">
                    {shopData.phone}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="shadow-md" style={{ textAlign: 'left', padding: '20px' }}>
                    {Object.entries(menuData).map(([cuisine, categories]) => (
                    <div className="bg-white p-4 shadow-xl rounded-lg mb-6 border border-gray-200" key={cuisine}>
                        <h1 className="text-2xl font-bold text-gray-800 mb-3">{cuisine}</h1>
                        {Object.entries(categories).map(([category, items]) => (
                        <div className="border-l-4 border-blue-500 pl-4 mb-4" key={category}>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">{category}</h2>
                            <ul>
                            {items.map((item, index) => {
                                const key = `${cuisine}-${category}-${item.name}`;
                                return (
                                <li key={index} className="mb-1 text-gray-600 flex justify-between items-center">
                                    <span>{item.name} - {item.description} - ${item.price}</span>
                                    <span>
                                    <button type="button" onClick={() => incrementQuantity(cuisine, category, item.name)} className="bg-blue-500 text-white px-2 py-1 rounded">+</button>
                                    <span className="mx-2">{quantities[key] || 0}</span>
                                    </span>
                                </li>
                                );
                            })}
                            </ul>
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit Order</button>
            </form>
            
           

            </>
    );
}

export default ShowMyShop