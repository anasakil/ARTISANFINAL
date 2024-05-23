import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Spin, Modal, message, Select, Tag } from 'antd';

import { getSellerOrders, updateSellerOrder, deleteSellerOrder } from '../../features/orders/ordersSlice';

const { Option } = Select;

const OrdersTable = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector(state => state.orders);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        dispatch(getSellerOrders());
    }, [dispatch]);

    if (error) {
        message.error(`Error: ${error}`);
    }

    const showModal = (order) => {
        setCurrentOrder(order);
        setNewStatus(order.status);
        setIsModalVisible(true);
    };

    const statusTagColors = {
        placed: 'Peru',
        shipped: 'geekblue',
        delivered: 'green',
        cancelled: 'red'
    };

    const handleUpdate = async () => {
        if (currentOrder) {
            const token = localStorage.getItem('token');
            await dispatch(updateSellerOrder({ orderId: currentOrder._id, status: newStatus, token }));
            setIsModalVisible(false);
        }
        await dispatch(getSellerOrders());
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            responsive: ['md'] // Column visible only on medium and larger screens
        },
        {
            title: 'Product Name',
            dataIndex: 'products',
            key: 'productName',
            render: products => products[0]?.product.name || 'N/A'
        },
        {
            title: 'Quantity',
            dataIndex: 'products',
            key: 'quantity',
            render: products => products[0]?.quantity || 0
        },
        {
            title: 'Price',
            dataIndex: 'products',
            key: 'price',
            render: products => `$${products[0]?.product.price || 0}`
        },
        {
            title: 'Image',
            dataIndex: 'products',
            key: 'image',
            render: products => (
                <img src={products[0]?.product.imageUrl} alt="product" style={{ width: 50, height: 50 }} />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag color={statusTagColors[status]}>{status}</Tag>
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <React.Fragment>
                    <Button  className="bg-custom-brown text-white" onClick={() => showModal(record)} type="primary" style={{ marginRight: 8 }}>
                        Update
                    </Button>
                    <Button onClick={() => dispatch(deleteSellerOrder({ orderId: record._id, token: localStorage.getItem('token') }))} type="danger">
                        Delete
                    </Button>
                </React.Fragment>
            ),
            responsive: ['sm'] 
        }
    ];

    const statusOptions = ['placed', 'shipped', 'delivered', 'cancelled'];

    const safeData = Array.isArray(orders) ? orders : [];

    return (
        <div>
            {status === 'loading' ? <Spin size="large" /> : (
                <Table
                    dataSource={safeData}
                    columns={columns}
                    rowKey={record => record._id}
                    pagination={{ pageSize: 5, responsive: true }}
                />
            )}
            <Modal
                title="Update Order Status"
                visible={isModalVisible}
                onOk={handleUpdate}
                onCancel={handleCancel}
                okText="Update"
                cancelText="Cancel"
            >
                <Select defaultValue={newStatus} style={{ width: '100%' }} onChange={setNewStatus}>
                    {statusOptions.map(status => (
                        <Option key={status} value={status}>{status}</Option>
                    ))}
                </Select>
            </Modal>
        </div>
    );
};

export default OrdersTable;
