import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import ProductTypes from "./ProductTypes";

function AdminDashboard(){
    return(
        <div>
            <h1>Admin Panel</h1>
            <nav>
                <ul>
                    <li><Link to="product-types">Ürün Türleri</Link></li>
                    <li><Link to="users">Müşteriler</Link></li>
                    <li><Link to="suppliers">Tedarikçiler</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="product-types" element={<ProductTypes/>}></Route>
                <Route path="users" element={<ProductTypes/>}></Route>
                <Route path="suppliers" element={<ProductTypes/>}></Route>
            </Routes>
        </div>
    )
}

export default AdminDashboard;