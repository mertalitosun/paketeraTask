import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import ProductTypes from "./pages/admin/ProductTypes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/product-types" element={<ProductTypes />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
