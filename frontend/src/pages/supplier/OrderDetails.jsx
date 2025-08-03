import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderDetail() {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchOrderDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/supplier/order-request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(res.data.order);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setMessage("Sipariş detayı alınamadı: " + err.message);
      }
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  if (message) return <p style={{ color: "red" }}>{message}</p>;

  if (!order) return <p>Yükleniyor...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
    <h2>Sipariş Detayı</h2>
  
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={{ border: "1px solid #ddd", padding: 10 }}>Sipariş ID</th>
          <th style={{ border: "1px solid #ddd", padding: 10 }}>Oluşturulma Tarihi</th>
          <th style={{ border: "1px solid #ddd", padding: 10 }}></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: 10 }}>{order.id}</td>
          <td style={{ border: "1px solid #ddd", padding: 10 }}>{new Date(order.createdAt).toLocaleString()}</td>
          <td style={{ border: "1px solid #ddd", padding: 10 }}>{order.interestStatus == "interested" ? "ilgileniyorum" : "ilgilenmiyorum"}</td>
        </tr>
      </tbody>
    </table>
  
    <h3>Ürünler</h3>
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={{ border: "1px solid #ddd", padding: 10 }}>Ürün Türü</th>
          <th style={{ border: "1px solid #ddd", padding: 10 }}>Adet</th>
        </tr>
      </thead>
      <tbody>
        {order.items.map((item, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: 10 }}>{item.productTypeName}</td>
            <td style={{ border: "1px solid #ddd", padding: 10 }}>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default OrderDetail;
