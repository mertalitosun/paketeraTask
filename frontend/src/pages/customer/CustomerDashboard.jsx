import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import ProductTypes from "./ProductTypes";
import CreateOrder from "./CreateOrder";
import Orders from "./Orders";
function CustomerDashboard(){
    return(
        <div>
            <h1>Müşteri Panel</h1>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li  className="nav-item"><Link className="nav-link" to="product-types">Ürün Türleri</Link></li>
                    <li  className="nav-item"><Link className="nav-link" to="order-requests">Sipariş Oluştur</Link></li>
                    <li  className="nav-item"><Link className="nav-link" to="orders">Siparişlerim</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="product-types" element={<ProductTypes/>}></Route>
                <Route path="order-requests" element={<CreateOrder/>}></Route>
                <Route path="orders" element={<Orders/>}></Route>
            </Routes>
        </div>
        
    )
}

export default CustomerDashboard;