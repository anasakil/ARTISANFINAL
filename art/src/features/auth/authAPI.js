import httpClient from '../../utils/httpClient';

export const loginUser = async (userData) => {
  const response = await httpClient.post('/users/login', userData);
  return response.data;
};
