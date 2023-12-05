import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const ShowShops = () => {

    const [shops, setShops] = useState([]); 

    useEffect(() => {
        axios.get(`http://localhost:3000/myShopDetails`)
        .then((response) => {
            setShops(response.data.data);
            console.log("hmmst does this work to get my Shop Details")
            console.log(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Admin Page: Existing Shops</h1>

                

            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Username</th>
                        <th className='border border-slate-600 rounded-md'>Shop Name</th>
                        <th className='border border-slate-600 rounded-md'>Description</th>
                        <th className='border border-slate-600 rounded-md'>Email</th>
                        <th className='border border-slate-600 rounded-md'>Phone Number</th>
                        <th className='border border-slate-600 rounded-md'>Vist Store</th>

                    </tr>
                </thead>

                <tbody>
                    {shops.map((shop,index) => (
                        <tr key={shops._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'> 
                                {index+1}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {shop.username}
                            </td>


                            <td className='border border-slate-700 rounded-md text-center'> 
                                {shop.shopName}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {shop.description}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {shop.email}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {shop.phone}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                <Link to={"/shops/" + shop.shopName} className="text-blue-600 underline hover:text-blue-800">
                                    See Shops List
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        

    )

}

export default ShowShops