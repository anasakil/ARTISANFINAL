import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productsSlice';

const AddProductModal = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;

        script.onload = () => {
            if (typeof window.cloudinary === 'undefined') {
                console.error('Cloudinary widget failed to load');
            } else {
                console.log('Cloudinary widget loaded successfully');
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const uploadImage = () => {
        if (!window.cloudinary) {
            console.error('Cloudinary widget is not loaded yet!');
            return;
        }

        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dso0onust',
            uploadPreset: 'ml_default'
        }, (error, result) => {
            if (error) {
                message.error('Failed to upload image');
            } else if (result && result.event === "success") {
                setImageUrl(result.info.secure_url);
                message.success('Image uploaded successfully');
            }
        });

        myWidget.open();
    };

    const onFinish = async (values) => {
        setLoading(true);
        const productData = { ...values, imageUrl };
        try {
            await dispatch(createProduct({ productData, token })).unwrap();
            setImageUrl('');
            form.resetFields();
            message.success('Product created successfully');
        } catch (error) {
           
            if (error.data && error.data.message) {
                message.error(error.data.message);
            } else if (error.message) {
                message.error(error.message);  
            } else {
                message.error('Failed to create product'); 
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <div>
                    <h2>Create New Product</h2>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input product name' }]}>
                            <Input placeholder="Enter product name" />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input product description' }]}>
                            <Input.TextArea rows={4} placeholder="Enter product description" />
                        </Form.Item>
                        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input product price' }]}>
                            <Input type="number" prefix="$" placeholder="Enter product price" />
                        </Form.Item>
                        <Form.Item label="Image">
                            <Button type="button" onClick={uploadImage} disabled={loading}>Upload Image</Button>
                            {imageUrl && (
                                <div style={{ marginTop: 8 }}>
                                    <img src={imageUrl} alt="Product" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input product category' }]}>
                            <Input placeholder="Enter product category" />
                        </Form.Item>
                        <Form.Item name="region" label="Region" rules={[{ required: true, message: 'Please input product region' }]}>
                            <Input placeholder="Enter product region" />
                        </Form.Item>
                        <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please input product stock' }]}>
                            <Input type="number" placeholder="Enter stock quantity" />
                        </Form.Item>
                        <Form.Item>
                            <Button  className="bg-custom-brown text-white" type="primary" htmlType="submit" loading={loading}>
                                Create Product
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default AddProductModal;
