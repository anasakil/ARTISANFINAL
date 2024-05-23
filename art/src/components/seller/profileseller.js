import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Alert, Spin, message } from 'antd';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setEmail(data.email);
          setUsername(data.username);
        } else {
          throw new Error(data.message || 'Failed to fetch the profile');
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password, imageUrl: user.imageUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        throw new Error(data.message || 'Failed to update the profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Load Cloudinary widget and handle image upload
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
      cloudName: 'dso0onust', // Replace with your Cloudinary cloud name
      uploadPreset: 'ml_default' // Ensure you have this preset configured in your Cloudinary dashboard
    }, (error, result) => {
      if (error) {
        message.error('Failed to upload image');
      } else if (result && result.event === "success") {
        setUser({ ...user, imageUrl: result.info.secure_url });
        message.success('Image uploaded successfully');
      }
    });

    myWidget.open();
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-1/2 h-1/2 rounded-full border-4 border-gray-300 overflow-hidden">
          <img src={user?.imageUrl || 'https://via.placeholder.com/150'} alt="Profile" className="object-cover w-full h-full"/>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-lg p-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{user?.username}</h3>
          <p className="mt-1 text-sm text-gray-600">Subscription Status: {user?.subscriptionStatus}</p>
          <Button onClick={uploadImage} className="my-2">Upload New Image</Button>
          <Form layout="vertical" className="mt-4">
            <Form.Item label="Username">
              <Input value={username} onChange={e => setUsername(e.target.value)} className="mt-1"/>
            </Form.Item>
            <Form.Item label="Email">
              <Input value={email} onChange={e => setEmail(e.target.value)} className="mt-1"/>
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password value={password} onChange={e => setPassword(e.target.value)} className="mt-1"/>
            </Form.Item>
            <Button type="primary" onClick={handleUpdateProfile} className="mt-4">Update Profile</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
