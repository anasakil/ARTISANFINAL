import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [email, setEmail] = useState('');
    const [paymentMethodId, setPaymentMethodId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            message.error('You are not authorized. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/subscriptions/stripe/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ email, paymentMethodId }),
            });
            const data = await response.json();
            if (response.ok) {
                message.success('Subscription created successfully!');
                navigate('/sellerdashboard');
            } else {
                message.error(`Failed to create subscription: ${data.message}`);
            }
        } catch (error) {
            message.error('Network error: Could not connect to the server');
        }
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Email Address"
                required
                tooltip="Enter your email address associated with the payment method."
            >
                <Input
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Payment Method ID"
                required
                tooltip="Enter your payment method ID from Stripe."
            >
                <Input
                    placeholder="Enter your payment method ID"
                    value={paymentMethodId}
                    onChange={e => setPaymentMethodId(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button  className="bg-custom-brown text-white" type="primary" htmlType="submit">
                    Create Subscription
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CheckoutForm;
