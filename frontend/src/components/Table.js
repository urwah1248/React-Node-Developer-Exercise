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

    const handleDelete = async (order) => {
        if(window.confirm("Are you sure you want to delete the Order "+order.id+"?")){
            try{
                const response = await fetch('/api/orders/'+order.id, {
                    method: 'DELETE',
                });
                if(response.ok){
                    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
                }
            } catch(error){
                alert(error)
                return
            }
        }
    }

    const tableRow =()=> (
            <tbody>
                {
                    orders.map(order => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.vendor}</td>
                                <td>{order.modelNumber}</td>
                                <td>{order.unitPrice}</td>
                                <td>{order.quantity}</td>
                                <td style={{textAlign:"center"}}>
                                    <button onClick={()=>handleDelete(order)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
    )

    const Loading =()=> (
        <h1 style={{color:"white", textAlign:"center"}}>Loading...</h1>
    )
  return (
    <div>
        <Link style={{color:"white"}} to={"/"}>Back to Form</Link>
        <h1 style={{textAlign:"center",color:"white"}}>Orders</h1>
        
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Vendor</th>
                    <th>Model Number</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
            </thead>
        {
            !loading&&tableRow()
        }
        </table>
        {loading&&Loading()}
    </div>
  )
}

export default Table