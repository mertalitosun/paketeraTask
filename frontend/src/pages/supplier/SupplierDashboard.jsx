import React from "react";
import {Link,Routes,Route} from "react-router-dom";
import Orders from "./Orders";

function AdminDashboard(){
    return(
        <div>
            <h1>Admin Panel</h1>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li  className="nav-item"><Link className="nav-link" to="orders">Talep Listesi</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="orders" element={<Orders/>}></Route>
            </Routes>
        </div>
    )
}

export default AdminDashboard;