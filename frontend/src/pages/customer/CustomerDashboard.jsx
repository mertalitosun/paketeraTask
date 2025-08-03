import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import ProductTypes from "./ProductTypes";
function CustomerDashboard(){
    return(
        <div>
            <h1>Müşteri Panel</h1>
        <nav>
                <ul>
                    <li><Link to="product-types">Ürün Türleri</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="product-types" element={<ProductTypes/>}></Route>
                
            </Routes>
        </div>
        
    )
}

export default CustomerDashboard;