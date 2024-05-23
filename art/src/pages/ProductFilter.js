import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByPrice, filterAlphabetically } from '../features/products/productsSlice';

const ProductFilter = () => {
    const dispatch = useDispatch();

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'price') {
            dispatch(filterByPrice());
        } else if (value === 'alphabetical') {
            dispatch(filterAlphabetically());
        }
    };

    return (
        <div className="my-4">
            <select onChange={handleSortChange} className="border p-2 rounded">
                <option value="">Sort by</option>
                <option value="price">Price</option>
                <option value="alphabetical">Alphabetical</option>
            </select>
        </div>
    );
};

export default ProductFilter;
