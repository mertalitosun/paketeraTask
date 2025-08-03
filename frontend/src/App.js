import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
// admin
import ProductTypes from "./pages/admin/ProductTypes";
import Users from './pages/admin/Users';
import Suppliers from './pages/admin/Suppliers';
import Customers from './pages/admin/Customers';
import Orders from './pages/admin/Orders';

// customer
import CustomerProductTypes from "./pages/customer/ProductTypes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/product-types" element={<ProductTypes />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/suppliers" element={<Suppliers />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/product-types" element={<CustomerProductTypes />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
