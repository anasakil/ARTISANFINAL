// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const handleRemoveFromCart = (id) => {
        const updatedItems = cartItems.filter(item => item._id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item => {
            if (item._id === id) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto px-4">
            <br/>
            <h1 className="text-3xl font-bold my-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-700">Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item._id} className="flex items-center justify-between py-4 border-b">
                                <div className="flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                                    <div className="ml-4">
                                        <h2 className="text-xl font-bold">{item.name}</h2>
                                        <p className="text-gray-700">{item.description}</p>
                                        <p className="text-gray-900 font-bold">${item.price}</p>
                                        <div className="flex items-center">
                                            <label className="mr-2">Quantity:</label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                className="border rounded px-2 py-1 w-16"
                                                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromCart(item._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleClearCart}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
