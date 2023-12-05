import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const CreateMenu = () => {
    const { shopName } = useParams();
    const [cuisine, setCuisine] = useState('');
    const [category, setCategory] =  useState('');
    const [name, setName] =  useState('');
    const [description, setDescription] =  useState('');
    const [price, setPrice] =  useState('');
    const navigate = useNavigate();

    const showAlertAndRedirect = (message, path) => {
        alert(message);
        navigate(path); 
    };

    const handleLoad = async () => {
        try {
            const auth = await axios.get('http://localhost:3000/authenticate', { withCredentials: true });
            console.log("we are on create menu page")
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

    const handleSaveMenuItem = () => {
        const data = {
            shopName,
            cuisine,
            category,
            name,
            description,
            price
        }
        axios.post(`http://localhost:3000/menu/${shopName}`, data, { withCredentials: true }) 
        .then(() => {
            navigate('/');
        })
        .catch((e) => {
            alert('An error has happened. Check Console'); 
        })
    }

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Create Menu Item</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Cuisine </label>
                    <input type='text' value={cuisine} onChange={(e) => setCuisine(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>


                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Category </label>
                    <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>


                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Name </label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>



                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Description </label>
                    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'> Price </label>
                    <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveMenuItem}>
                    Save
                </button>


            </div>
        </div>
    )
}

export default CreateMenu