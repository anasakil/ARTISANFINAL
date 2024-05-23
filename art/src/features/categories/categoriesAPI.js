import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/category';

const getToken = () => localStorage.getItem("token");

const config = (token = getToken()) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchAllCategories = async (token) => {
  try {
    const response = await axios.get(BASE_URL, config(token));
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createCategory = async (categoryData, token) => {
  try {
    const response = await axios.post(BASE_URL, categoryData, config(token));
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateCategory = async (categoryId, categoryData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${categoryId}`, categoryData, config(token));
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteCategory = async (categoryId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${categoryId}`, config(token));
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
