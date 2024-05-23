import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSellerProducts, deleteProduct } from '../../features/products/productsSlice';
import UpdateProductForm from './UpdateProductForm';
import { SearchOutlined } from '@ant-design/icons'; 

import { Table, Button, Modal, Popconfirm, message, Input } from 'antd';
import DashboardStatsGrid from './DashboardCard';
import TransactionChart from './TransactionChart';
import BuyerProfilePieChart from './BuyerProfilePieChart';

const ProductsTable = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products); 
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        dispatch(fetchSellerProducts()); 
    }, [dispatch]); 


    const handleDelete = (productId) => {
        dispatch(deleteProduct({ productId, token }))
            .then(() => {
                message.success('Product deleted successfully');
                dispatch(fetchSellerProducts());
            })
            .catch(error => {
                message.error('Failed to delete product');
                console.error('Error deleting product:', error);
            });
    };

    const openUpdateModal = (product) => {
        setCurrentProduct(product);
        setIsModalVisible(true);
    };

    const closeUpdateModal = () => {
        setCurrentProduct(null);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        autoFocus
                        placeholder="Type to search"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: price => `${price}$`,
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: imageUrl => <img src={imageUrl} alt="product" style={{ width: '100px', height: 'auto' }} />,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button   className="bg-custom-brown text-white" onClick={() => openUpdateModal(record)}>Update</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (

        <div>
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
            <h1>My Products</h1>
            <Table 
                dataSource={products} 
                columns={columns} 
                rowKey="_id" 
                pagination={{ pageSize: 10 }}
                responsive={['lg', 'md', 'sm', 'xs']}
            />
            <Modal
                title="Update Product"
                visible={isModalVisible}
                onCancel={closeUpdateModal}
                footer={null}
            >
                {currentProduct && <UpdateProductForm product={currentProduct} closeForm={closeUpdateModal} />}
            </Modal>
        </div>
    );
};

export default ProductsTable;
