import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products'; 

export const fetchProductsByRegion = async (region) => {
    const response = await axios.get(`${API_URL}/${region}`);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    console.log('Request Headers:', config.headers);
    const response = await axios.post(API_URL, productData, config);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateProduct = async (id, productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/${id}`, productData, config);
    return response.data;
};

export const deleteProduct = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
};
