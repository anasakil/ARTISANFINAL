// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
    const { productId } = useParams();
    const product = useSelector(state => state.products.items.find(item => item._id === productId));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-5 md:py-3 lg:py-3">
            <div className="flex flex-col md:flex-row">
                <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 object-cover" />
                <div className="p-4">
                    <h2 className="text-3xl font-bold">{product.name}</h2>
                    <p className="text-gray-700 text-base">{product.description}</p>
                    <h4 className="text-2xl font-semibold mt-2">${product.price}</h4>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
