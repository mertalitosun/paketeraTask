import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import ProductTypes from "./ProductTypes";
import CreateOrder from "./CreateOrder";
import Orders from "./Orders";
function CustomerDashboard(){
    return(
        <div>
            <h1>Müşteri Panel</h1>
        <nav>
                <ul>
                    <li><Link to="product-types">Ürün Türleri</Link></li>
                    <li><Link to="order-requests">Sipariş Oluştur</Link></li>
                    <li><Link to="orders">Siparişlerim</Link></li>
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