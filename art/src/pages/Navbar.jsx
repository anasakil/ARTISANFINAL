// src/components/Navbar.js
import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCheck, FaUser, FaShoppingBag } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();
    const isLoggedIn = isAuthenticated();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className={`flex items-center justify-between p-4 fixed top-0 left-0 w-full z-20 transition-all duration-300 bg-[#97644e] shadow-lg`}>
            <div className="text-white logo text-2xl font-bold">ARTISAN</div>
            <div className="text-white md:hidden">
                {isOpen ? (
                    <FaTimes onClick={toggleNavbar} className="text-3xl cursor-pointer" />
                ) : (
                    <FaBars onClick={toggleNavbar} className="text-3xl cursor-pointer" />
                )}
            </div>
            <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col absolute top-full left-0 w-full bg-[#97644e] mt-2 p-4 rounded-md shadow-md transition-all duration-300 ease-in-out`}>
                <ul className="flex flex-col items-center">
                    <li className="my-2">
                        <button onClick={() => { closeNavbar(); navigate('/'); }} className="text-white hover:text-gray-600">Home</button>
                    </li>
                    <li className="my-2">
                        <a href="#categories" onClick={closeNavbar} className="text-white hover:text-gray-600">Categories</a>
                    </li>
                    <li className="my-2">
                        <a href="#contact" onClick={closeNavbar} className="text-white hover:text-gray-600">Contact Us</a>
                    </li>
                    <li className="my-2">
                        <a href="#blog" onClick={closeNavbar} className="text-white hover:text-gray-600">Blog</a>
                    </li>
                    <li className="my-2">
                        <a href="/product" onClick={closeNavbar} className="text-white hover:text-gray-600">Product</a>
                    </li>
                </ul>
                <div className="flex justify-center mt-4">
                    {isLoggedIn ? (
                        <FaUserCheck onClick={handleUserIconClick} className="text-white text-2xl mx-2 cursor-pointer hover:text-gray-600" />
                    ) : (
                        <FaUser onClick={handleUserIconClick} className="text-white text-2xl mx-2 cursor-pointer hover:text-gray-600" />
                    )}
                    <div className="relative" onClick={() => navigate('/cart')}>
                        <FaShoppingBag className="text-white text-2xl mx-2 cursor-pointer hover:text-gray-600" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:items-center">
                <ul className="md:flex">
                    <li className="mx-4">
                        <button onClick={() => { navigate('/') }} className="text-white font-semibold hover:text-gray-600">Home</button>
                    </li>
                    <li className="mx-4">
                        <a href="#categories" className="text-white hover:text-gray-600">Categories</a>
                    </li>
                    <li className="mx-4">
                        <a href="/contact" className="text-white hover:text-gray-600">Contact Us</a>
                    </li>
                    <li className="mx-4">
                        <a href="/blogs" className="text-white hover:text-gray-600">Blogs</a>
                    </li>
                    <li className="mx-4">
                        <button onClick={() => { navigate('/allproducts') }} className="text-white hover:text-gray-600">Product</button>
                    </li>
                    <li className="mx-4">
                        {isLoggedIn ? (
                            <FaUserCheck onClick={handleUserIconClick} className="text-white text-xl cursor-pointer hover:text-gray-600" />
                        ) : (
                            <FaUser onClick={handleUserIconClick} className="text-white text-xl cursor-pointer hover:text-gray-600" />
                        )}
                    </li>
                    <li className="mx-4 relative">
                        <div className="relative" onClick={() => navigate('/cart')}>
                            <FaShoppingBag className="text-white text-xl cursor-pointer hover:text-gray-600" />
                            {cartCount > 0 && (
                                <span className="absolute top-3 right-4 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
