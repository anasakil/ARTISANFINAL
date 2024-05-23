// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectFilteredProducts } from '../features/products/productsSlice';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './hero';
import Category from './Category';
import Cards from './cards';
import ProductFilter from './ProductFilter';

// Function to shuffle an array
const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts);

    useEffect(() => {
        document.title = 'Home';
        dispatch(fetchProducts());
    }, [dispatch]);

    // Shuffle the filteredProducts array and limit to 10
    const shuffledProducts = shuffleArray([...filteredProducts]);
    const limitedProducts = shuffledProducts.slice(0, 8);

    return (
        <>
            <Navbar />
            <Hero />
            <Category />
            <Cards />
            <div className="container mx-auto px-4">           
              <button onClick={() => { navigate('/allproducts') }}   className="flex items-center justify-center rounded-md bg-[#97644E] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4 float-right">view all products</button>

                <h1 className="text-3xl font-bold my-6">Home</h1>
                <ProductFilter />  
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {limitedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </>
    );
};

export default Home;
