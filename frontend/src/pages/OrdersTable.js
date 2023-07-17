import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Loading from '../components/Loading';
import {EnterOutlined } from '@ant-design/icons'
import Table from '../components/Table';

const OrdersTable = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch('/api/orders')
        .then(res => res.json())
        .then(items=> {setOrders(items); setLoading(false)})
    },[])

  return (
    <main>
        <Link to={"/"} style={{display:"block", position:"absolute", top:13, left:10}}>
            <Button icon={<EnterOutlined />} style={{marginTop:10, textAlign:"center"}}></Button>
        </Link>
        <h1 style={{textAlign:"center",color:"white"}}>Orders</h1>
        {
            loading?
                <Loading/> :
                <Table orders={orders} setOrders={setOrders}/>
        }
    </main>
  )
}

export default OrdersTable