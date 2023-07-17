import { Button, Modal } from 'antd';
import {DeleteOutlined, ExclamationCircleFilled} from '@ant-design/icons'
import { onDelete, onFinishFailed } from './notifications';
const { confirm } = Modal;

const TableBody = ({orders, setOrders}) => {
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
    return (
    <tbody>
        {
            orders.map(order => {
                return (
                    <tr key={order.id}>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.vendor}</td>
                        <td>{order.modelNumber}</td>
                        <td>{order.unitPrice}</td>
                        <td>{order.quantity}</td>
                        <td style={{textAlign:"center"}}>
                            <Button onClick={()=>handleDelete(order)} type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                        </td>
                    </tr>
                )
            })
        }
    </tbody>
)}

export default TableBody;