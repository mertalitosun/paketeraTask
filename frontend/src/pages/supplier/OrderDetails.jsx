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
      const res = await axios.get(`http://148.230.107.226:4000/supplier/order-request/${id}`, {
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

  const updateInterestStatus = async (newStatus) => {
    try {
      const res = await axios.patch(
        `http://148.230.107.226:4000/supplier/order-request/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder({ ...order, interestStatus: newStatus });
    } catch (err) {
      setMessage("Durum güncellenemedi: " + err.message);
    }
  };

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
          <th>İlgi Durumu</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{order.id}</td>
          <td>{new Date(order.createdAt).toLocaleString()}</td>
          <td>{order.interestStatus === "interested" ? "İlgileniyorum" : "İlgilenmiyorum"}</td>
        </tr>
      </tbody>
    </table>
  
    {/* İlgi butonları */}
    <div className="mb-4">
      <strong>Bu taleple ilgileniyor musunuz?</strong><br />
      <button
        className="btn btn-success me-2"
        onClick={() => updateInterestStatus("interested")}
        disabled={order.interestStatus === "interested"}
      >
        ✅ İlgileniyorum
      </button>
      <button
        className="btn btn-danger"
        onClick={() => updateInterestStatus("not_interested")}
        disabled={order.interestStatus === "not_interested"}
      >
        ❎ İlgilenmiyorum
      </button>
    </div>
  
    <h3>Ürünler</h3>
    <table className="table table-bordered mb-5">
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
  </div>
  
  
  );
}

export default OrderDetail;
