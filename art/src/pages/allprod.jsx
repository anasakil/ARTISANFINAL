import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectFilteredProducts } from '../features/products/productsSlice';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const Allprod = () => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
    
        <div className="container mx-auto px-4"> <br />
            <h1 className="text-3xl font-bold my-6">ALL PRODUCTS</h1>
            <ProductFilter />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>
        </>
    );
};

export default Allprod;
