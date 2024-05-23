import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3001', 
});

httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default httpClient;
