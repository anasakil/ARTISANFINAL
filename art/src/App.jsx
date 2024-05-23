import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import Dashboard from './components/seller/Dashboard';
import AddProductModal from './components/seller/AddProductModal';
import CategoryManagement from './components/admin/CategoryManagement';
import Register from './components/auth/Register';
import ProductsPage from './Map/productspage';
import Home from './pages/Home';
import SellerManagement from './components/admin/SellerManagement';
import SellerOrders from './components/seller/SellerOrders';
import Layout from './components/seller/Layout';
import UserProfile from './components/seller/profileseller';
import CheckoutForm from './components/seller/checkout';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Maroc from './pages/maroc';
import LayoutWithNavbar from './pages/LayoutWithNavbar';
import Allprod from './pages/allprod';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<LayoutWithNavbar />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/allproducts" element={<Allprod />} />
                <Route path="/maroc" element={<Maroc/>} />
                <Route path="/products/:region" element={<ProductsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
        </Route>

     

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/sellers" element={<SellerManagement />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
          <Route path="/sellerdashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/sellerdashboard/addproduct" element={<AddProductModal />} />
            <Route path="/sellerdashboard/orders" element={<SellerOrders />} />
            <Route path="/sellerdashboard/profile" element={<UserProfile />} />
            <Route path="/sellerdashboard/subscribe" element={<CheckoutForm />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
