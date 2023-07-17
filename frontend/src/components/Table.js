import React from 'react'
import './Table.css'
import { Button,Modal, Table as AntTable } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled} from '@ant-design/icons'
import { onFinishFailed, onDelete } from './notifications';
import PropTypes from 'prop-types'

const { confirm } = Modal;

const Table = ({orders, setOrders}) => {
    //Handling the Delete Request on the the Server and the Client
    const handleDelete = async (order) => {
        confirm({
            title: "Are you sure you want to delete this Order?",
            icon: <ExclamationCircleFilled />,
            content: "This Action is not reversible.",
            onOk() {
                fetch('/api/orders/'+order.id, {
                method: 'DELETE',
                }).then(res => {
                    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
                    onDelete(order)
                }).catch(err => {
                    onFinishFailed(err)
                })
            },
            onCancel() {
              return;
            },
        });
    }

    //Table Columns for the Component
    const tableColumns = [
        {
            title: 'Date',
            key: 'date',
            render: (_, order) => (
                <>{new Date(order.date).toLocaleDateString()}</>
            )
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'Model Number',
            dataIndex: 'modelNumber',
            key: 'modelNumber',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, order) => (
                <Button onClick={()=>handleDelete(order)} type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            ),
        },
    ]

  return (
    <div className="table">
        <AntTable dataSource={orders} columns={tableColumns}/>
    </div>
  )
}

Table.propTypes = {
    orders: PropTypes.array.isRequired,
    setOrders: PropTypes.func.isRequired
}

export default Table