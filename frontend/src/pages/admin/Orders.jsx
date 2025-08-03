import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/order-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      setMessage("Ürün türleri alınamadı: " + err.message);
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
                <th style={{ border: "1px solid #ddd", padding: 10 }}>Müşteri Adı</th>
                <th style={{ border: "1px solid #ddd", padding: 10 }}>Ürünler</th>
                <th style={{ border: "1px solid #ddd", padding: 10 }}>İlgilenen Tedarikçiler</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                <tr key={order.id}>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>{order.id}</td>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>{new Date(order.createdAt).toLocaleString()}</td>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>{order.customerName}</td>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    <ul style={{ margin: 0, paddingLeft: 15 }}>
                        {order.items.map((item, index) => (
                        <li key={index}>
                            {item.productTypeName} - {item.quantity}
                        </li>
                        ))}
                    </ul>
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: 10 }}>
                    {order.interestedSuppliers.length > 0 
                        ? order.interestedSuppliers.join(", ")
                        : "Yok"}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

    </div>
  );
}

export default Orders;
