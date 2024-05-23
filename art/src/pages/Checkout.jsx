// src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OwxJtCfxu4Ymg82mxNu47iFlFUcC8fczYRtr9RanMA0BFjzVylCadUYsouLfNcdPd8WIShrSMzsZh8ZtPVVc8Vz00JGq8V45K');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        // Calculate subtotal from cart items in localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || cartItems;
        const calculatedSubtotal = storedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(calculatedSubtotal);
    }, [navigate, cartItems]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const paymentMethodRes = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        });

        if (paymentMethodRes.error) {
            setError(paymentMethodRes.error.message);
            setProcessing(false);
            return;
        }

        // Retrieve product data from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || cartItems;
        console.log('Stored Cart Items:', storedCartItems); // Debugging log

        const orderData = {
            products: storedCartItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
            })),
            paymentMethodId: paymentMethodRes.paymentMethod.id,
        };

        console.log('Order Data:', orderData); // Debugging log

        if (!orderData.products || orderData.products.length === 0) {
            setError('No products found in the order.');
            setProcessing(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/api/orders/buyer', orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setSucceeded(true);
                localStorage.removeItem('cartItems');
                navigate('/order-success');
            } else {
                setError('Order placement failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Order placement failed. Please try again.');
        }

        setProcessing(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white  shadow-lg rounded-lg p-6 md:p-12">
                <div className="grid md:grid-cols-[1fr_300px] gap-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h1>
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-lg font-semibold">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="input px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-lg font-semibold">Card Details</label>
                                <CardElement className="p-2 border rounded-md" />
                            </div>
                            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                            <button
                                type="submit"
                                disabled={processing || succeeded}
                                className="btn w-full px-4 py-2 bg-[#97644E] text-white rounded-md hover:bg-[#97644E] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                {processing ? 'Processing...' : 'Pay Now'}
                            </button>
                        </form>
                    </div>
                    <div className="bg-gray-100  rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <br/>  

                            <div className="flex items-center justify-between">
                                <span>Free Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex items-center justify-between">
                            </div>
                            <hr className="my-2" />
                            <div className="flex items-center justify-between font-bold">
                                <span>Total</span>
                                <span>${(subtotal + 0).toFixed(2)}</span>
                            </div>
                            <button className="btn w-full px-4 py-2 bg-[#97644E] text-white rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Checkout = () => {
  return (
      <Elements stripe={stripePromise}>
          <CheckoutForm />
      </Elements>
  );
};

export default Checkout;
