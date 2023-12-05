import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const OrdersPage = () => {

    const [myorders, setMyOrders] = useState([]); 
    const [shopOrders, setShopOrders] = useState([]); 


    useEffect(() => {
        axios.get('http://localhost:3000/myOrders', { withCredentials: true })
        .then((response) => {
            setMyOrders(response.data.myPlacedOrders);
            setShopOrders(response.data.myShopOrders);
            console.log("Orders I placed:", response.data.myPlacedOrders);
            console.log("Orders for my shop:", response.data.myShopOrders);
        })
        .catch((error) => {
            console.error('Error fetching orders:', error);
        });
    }, []);

    const renderOrderRow = (element, index) => (
        <tr key={index} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>{element.placedAt}</td>
            <td className='border border-slate-700 rounded-md text-center'>{element.shopName}</td>
            <td className='border border-slate-700 rounded-md text-center'>{element.cuisine}</td>
            <td className='border border-slate-700 rounded-md text-center'>{element.category}</td>
            <td className='border border-slate-700 rounded-md text-center'>{element.name}</td>
            <td className='border border-slate-700 rounded-md text-center'>{element.quantity}</td>
        </tr>
    );

    const flattenedOrderItems = myorders.flatMap(entry => entry.items.map(item => ({ ...item, shopName: entry.shopName, placedAt: entry.placedAt })));

    const flattenedStoreOrderItems = shopOrders.flatMap(entry => entry.items.map(item => ({ ...item, shopName: entry.shopName, placedAt: entry.placedAt })));


    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>My Orders</h1>
            <h2 className='text-2xl my-4'>Orders I Placed</h2>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>Time Ordered</th>
                        <th className='border border-slate-600 rounded-md'>Store Ordered From</th>
                        <th className='border border-slate-600 rounded-md'>Cuisine</th>
                        <th className='border border-slate-600 rounded-md'>Category</th>
                        <th className='border border-slate-600 rounded-md'>Name</th>
                        <th className='border border-slate-600 rounded-md'>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    { flattenedOrderItems.map((item, index) => renderOrderRow(item, index)) }
                    {/* {flattenedOrderItems.map((item, index) => renderOrderRow(item, index))} */}
                </tbody>
            </table>

            <h2 className='text-2xl my-4'>Orders for My Shop</h2>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    {/* Same table headers as above */}
                </thead>
                <tbody>
                    {flattenedStoreOrderItems.map((item, index) => renderOrderRow(item, index))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;