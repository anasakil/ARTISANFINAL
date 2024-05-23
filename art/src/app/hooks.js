// import { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode'; 
// const useAuth = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token); 
//         const currentTime = new Date().getTime() / 1000;
//         if (decoded.exp < currentTime) {
//           localStorage.removeItem('token');
//           setUser(null);
//         } else {
//           setUser({ ...decoded });
//         }
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         localStorage.removeItem('token');
//         setUser(null);
//       }
//     }
//   }, []);

//   return user;
// };

// export default useAuth;
