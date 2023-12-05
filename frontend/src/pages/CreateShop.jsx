import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateShop = () => {

    const [username, setUsername] = useState('');
    const [shopName, setShopName] =  useState('');
    const [description, setDescription] =  useState('');
    const [email, setEmail] =  useState('');
    const [phone, setPhone] =  useState('');
    const navigate = useNavigate();

    const showAlertAndRedirect = (message, path) => {
        alert(message);
        navigate(path); 
    };

    const handleLoad = async () => {
        try {
            const auth = await axios.get('https://madeathome-backend2.onrender.com/authenticate', { withCredentials: true });
            console.log("the auth result is: ", auth)
            if (auth.data.msg === 'authenticated') {
                console.log('authenticated');
            } else {
                console.log('not authenticated');
                showAlertAndRedirect("You can't access this page without logging in ", "/");
            }
        } catch (error) {
            
            console.error('Error checking authentication', error);
        }
    };


    handleLoad(); 

    const handleSaveShopItem = () => {
        const data = {
            username,
            shopName,
            description,
            email,
            phone
        }
        axios.post('https://madeathome-backend2.onrender.com/shopCreation', data, { withCredentials: true }) 
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                // Check if it's a validation error
                if (error.response.status === 400 && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('An error has occurred. Please try again later.');
                }
            } else {
                alert('An unexpected error has occurred. Please try again.');
            }

        })
    }

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Create Your Shop</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Shop Name </label>
                    <input type='text' value={shopName} onChange={(e) => setShopName(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>


                {/* Need to make this into a textarea field */}
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Description </label>
                    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Email </label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Phone Number </label>
                    <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveShopItem}>
                    Save
                </button>


            </div>
        </div>
    )
}

export default CreateShop;
