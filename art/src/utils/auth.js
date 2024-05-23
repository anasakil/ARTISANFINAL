const jwtDecode = require('jwt-decode');


export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role;
};

export function isAdmin(user) {
  return user && user.role === 'admin';
}


export const getUserRole = () => {
  return localStorage.getItem('role');
};

export const saveUserRole = (role) => {
  localStorage.setItem('role', role);
};


export const saveUsername = (username) => {
  localStorage.setItem('name', username);
};

export const getUserDetails = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};


export const clearUserRole = () => {
  localStorage.removeItem('role');
};
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
