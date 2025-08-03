import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import Orders from "./Orders";

function AdminDashboard(){
    return(
        <div>
            <h1>Admin Panel</h1>
            <nav>
                <ul>
                    <li><Link to="orders">Talep Listesi</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="orders" element={<Orders/>}></Route>
            </Routes>
        </div>
    )
}

export default AdminDashboard;