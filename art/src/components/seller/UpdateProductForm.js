import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../features/products/productsSlice';

const UpdateProductForm = ({ product, closeForm }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            dispatch(updateProduct({
                productId: product._id,
                productData: values,
                token
            }));
            message.success('Product updated successfully');
            closeForm();
        } catch (errorInfo) {
            console.error('Error updating product:', errorInfo);
            message.error('Failed to update product');
        }
    };

    return (
        <Form form={form} onFinish={handleSubmit} initialValues={product}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input product name' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input product price' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input product category' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input product description' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Product
                </Button>
                <Button type="default" onClick={closeForm}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProductForm;
