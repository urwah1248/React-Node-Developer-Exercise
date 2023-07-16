import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Table.css'

const Table = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch('/api/orders')
        .then(res => res.json())
        .then(items=> {setOrders(items); setLoading(false)})
    },[])

    if(loading){
        return <h1 style={{color:"white"}}>Loading</h1>
    }
  return (
    <div>
        <Link style={{color:"white"}} to={"/"}>Back to Form</Link>
        <h1 style={{textAlign:"center",color:"white"}}>Table</h1>
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Vendor</th>
                    <th>Model Number</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order => {
                        return (
                            <tr>
                                <td>{order.id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.vendor}</td>
                                <td>{order.modelNumber}</td>
                                <td>{order.unitPrice}</td>
                                <td>{order.quantity}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table