// ProductsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../pages/ProductCard';
import ProductFilter from '../pages/ProductFilter';

const ProductsPage = () => {
  const { region } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/products/${region}`)
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error(err));
    document.title = `Products ${region}`;
  }, [region]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, products]);

  return (
    <div className="container mx-auto px-4">
      <br/>
      <h1 className="text-3xl font-bold my-6">Products in {region}</h1>
      <ProductFilter filter={filter} setFilter={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
