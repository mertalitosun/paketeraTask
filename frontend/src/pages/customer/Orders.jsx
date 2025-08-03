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
      const res = await axios.get("http://localhost:4000/customer/orders", {
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
    <div className="container" style={{ maxWidth: 800 }}>
  <h2 className="my-4">Talepler</h2>

  {message && <p className="text-danger my-2">{message}</p>}

  <table className="table table-bordered table-hover mt-3">
    <thead className="table-light">
      <tr>
        <th>ID</th>
        <th>Tarih</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{new Date(order.createdAt).toLocaleString()}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/customer/orders/${order.id}`)}
            >
              Detay
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default Orders;
