import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import ProductTypes from "./ProductTypes";
import Users from "./Users";
import Suppliers from "./Suppliers";
import Customers from "./Customers";
import Orders from "./Orders";

function AdminDashboard(){
    return(
        <div>
            <h1>Admin Panel</h1>
            <nav>
                <ul>
                    <li><Link to="product-types">Ürün Türleri</Link></li>
                    <li><Link to="users">Kullanıcılar</Link></li>
                    <li><Link to="customers">Müşteriler</Link></li>
                    <li><Link to="suppliers">Tedarikçiler</Link></li>
                    <li><Link to="orders">Talepler</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="product-types" element={<ProductTypes/>}></Route>
                <Route path="users" element={<Users/>}></Route>
                <Route path="suppliers" element={<Suppliers/>}></Route>
                <Route path="customers" element={<Customers/>}></Route>
                <Route path="orders" element={<Orders/>}></Route>
            </Routes>
        </div>
    )
}

export default AdminDashboard;