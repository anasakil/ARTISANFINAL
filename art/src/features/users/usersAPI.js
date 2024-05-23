import axios from 'axios';


const API_URL = 'http://localhost:3001/api/admin/users/';
const SUBSCRIPTIONS_URL='http://localhost:3001/api/subscriptions/subscribe';
export const fetchUsersFromAPI = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateUserInAPI = async ({ id, user }) => {
  const token = localStorage.getItem('token');
  return await axios.put(`${API_URL}${id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserFromAPI = async (userId) => {
  const token = localStorage.getItem('token');
  return await axios.delete(`${API_URL}${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUserInAPI = async (newUser) => {
  const token = localStorage.getItem('token');
  return await axios.post(API_URL, newUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const fetchSubscriptionsFromAPI = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(SUBSCRIPTIONS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




