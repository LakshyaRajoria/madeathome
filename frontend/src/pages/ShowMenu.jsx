import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const ShowMenu = () => {

    const [items, setItem] = useState([]); 

    useEffect(() => {
        axios.get(`http://localhost:3000/menu`)
        .then((response) => {
            setItem(response.data.data);
            console.log("hmmst does this work")
            console.log(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Menu</h1>

                
                <h3><Link to="/menu">Create New Item on Menu</Link></h3>
                <h4 className='bg-blue-500'>Hello World!</h4>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Cuisine</th>
                        <th className='border border-slate-600 rounded-md'>Category</th>
                        <th className='border border-slate-600 rounded-md'>Name</th>
                        <th className='border border-slate-600 rounded-md'>Description</th>
                        <th className='border border-slate-600 rounded-md'>Price</th>

                    </tr>
                </thead>

                <tbody>
                    {items.map((item,index) => (
                        <tr key={items._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'> 
                                {index+1}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {item.cuisine}
                            </td>


                            <td className='border border-slate-700 rounded-md text-center'> 
                                {item.category}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {item.name}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {item.description}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'> 
                                {item.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        

    )

}

export default ShowMenu