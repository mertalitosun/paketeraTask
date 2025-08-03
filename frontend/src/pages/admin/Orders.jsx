import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/order-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token"); 
        navigate("/login"); 
      } else {
        setMessage("Ürün türleri alınamadı: " + err.message);
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div className="container py-4" style={{ maxWidth: 800 }}>
  <h2 className="mb-4">Talepler</h2>
  {message && <div className="alert alert-info">{message}</div>}

  <div className="table-responsive">
    <table className="table table-bordered table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Tarih</th>
          <th>Müşteri Adı</th>
          <th>Ürünler</th>
          <th>İlgilenen Tedarikçiler</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
            <td>{order.customerName}</td>
            <td>
              <ul className="mb-0 ps-3">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productTypeName} - {item.quantity}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              {order.interestedSuppliers.length > 0
                ? order.interestedSuppliers.join(", ")
                : "Yok"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default Orders;
