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
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Talepler</h2>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
            <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ border: "1px solid #ddd", padding: 10 }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: 10 }}>Tarih</th>
                <th style={{ border: "1px solid #ddd", padding: 10 }}></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                <tr key={order.id}>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>{order.id}</td>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>{new Date(order.createdAt).toLocaleString()}</td>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>
                        <button onClick={() => navigate(`/customer/orders/${order.id}`)}>Detay</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

    </div>
  );
}

export default Orders;
