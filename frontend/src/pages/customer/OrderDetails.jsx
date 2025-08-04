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
      const res = await axios.get(`http://148.230.107.226:4000/customer/order-request/${id}`, {
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
    <div className="container" style={{ maxWidth: 800 }}>
  <h2 className="my-4">Sipariş Detayı</h2>

  <table className="table table-bordered mb-4">
    <thead className="table-light">
      <tr>
        <th>Sipariş ID</th>
        <th>Oluşturulma Tarihi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{order.id}</td>
        <td>{new Date(order.createdAt).toLocaleString()}</td>
      </tr>
    </tbody>
  </table>

  <h3>Ürünler</h3>
  <table className="table table-bordered mb-4">
    <thead className="table-light">
      <tr>
        <th>Ürün Türü</th>
        <th>Adet</th>
      </tr>
    </thead>
    <tbody>
      {order.items.map((item, index) => (
        <tr key={index}>
          <td>{item.productTypeName}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <h3>İlgilenen Tedarikçiler</h3>
  {order.interestedSuppliers.length > 0 ? (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>Tedarikçi Adı</th>
        </tr>
      </thead>
      <tbody>
        {order.interestedSuppliers.map((supplier, i) => (
          <tr key={i}>
            <td>{supplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Henüz ilgilenen tedarikçi yok.</p>
  )}
</div>

  
  );
}

export default OrderDetail;
