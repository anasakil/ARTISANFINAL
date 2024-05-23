import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import { Form, Input, Button, Typography, Alert } from 'antd';

const { Title } = Typography;

const Register = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/login');
      } else {
        // Check if the error is due to a duplicate username
        if (resultAction.error.code === 'E11000' && resultAction.error.keyPattern.username) {
          setError('Username already exists. Please choose a different username.');
        } else {
          console.error('Registration failed:', resultAction.error);
          setError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Failed to register:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '5rem',
      background: '#F5F5F5',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '800px',
        width: '100%',
        padding: '2rem',
        borderRadius: '8px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', minWidth: '300px' }}>
          <img src="/logimg.png" alt="Register" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
        <div style={{ flex: 1, padding: '1rem', minWidth: '300px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem', color: '#97644e' }}>Register</Title>
          {error && <Alert message={error} type="error" style={{ marginBottom: '1rem' }} />}
          <Form
            name="register"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#97644e', border: 'none' }}>Register</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;