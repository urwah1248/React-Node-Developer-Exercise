import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TableBody from './TableBody';
import './Table.css'
import { Button } from 'antd';
import Loading from './Loading';

const Table = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch('/api/orders')
        .then(res => res.json())
        .then(items=> {setOrders(items); setLoading(false)})
    },[])

    
  return (
    <div>
        <Link to={"/"} style={{display:"block", position:"absolute", top:13}}>
            <Button style={{marginTop:10, textAlign:"center"}}>
                Back to Form
            </Button>
        </Link>
        <h1 style={{textAlign:"center",color:"white"}}>Orders</h1>
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>Order Date</th>
                    <th>Vendor</th>
                    <th>Model Number</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                </tr>
            </thead>
            {
                !loading && <TableBody orders={orders} setOrders={setOrders}/>
            }
        </table>
        { loading && Loading()}
    </div>
  )
}

export default Table