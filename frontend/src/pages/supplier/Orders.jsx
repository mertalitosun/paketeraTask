import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SupplierOrders() {
  const [productTypes, setProductTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
    const navigate = useNavigate();
  // Ürün türlerini çek
  const fetchProductTypes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/supplier/product-types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductTypes(res.data);
    } catch (err) {
      setMessage("Ürün türleri alınamadı: " + err.message);
    }
  };

  const fetchOrders = async () => {
    try {
      let url = "http://localhost:4000/supplier/order-requests";
  
      if (selectedTypes.length > 0) {
        const query = selectedTypes.join(",");
        url += `?productTypeIds=${query}`;
      }
  
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setOrders(res.data.orders); 
    } catch (err) {
      setMessage("Talepler alınamadı: " + err.message);
    }
  };
  

  useEffect(() => {
    fetchProductTypes();
    fetchOrders();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id)
        ? prev.filter((typeId) => typeId !== id)
        : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2>Talepler</h2>

      <div style={{ marginBottom: 20 }}>
        <strong>Ürün Türlerine Göre Filtrele:</strong><br />
        {productTypes.map((type) => (
          <label key={type.id} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              value={type.id}
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleCheckboxChange(type.id)}
            />
            {type.name}
          </label>
        ))}
        <button style={{ marginLeft: 15, padding: "4px 10px" }} onClick={fetchOrders}>
          Filtrele
        </button>
      </div>

      {message && <p style={{ color: "red" }}>{message}</p>}

      
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>Tarih</th>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>Ürünler</th>
            <th style={{ border: "1px solid #ddd", padding: 10 }}></th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
            <tr key={order.id}>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>{order.id}</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>{new Date(order.createdAt).toLocaleString()}</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>
                <ul style={{ margin: 0, paddingLeft: 15 }}>
                    {order.items.map((item, index) => {
                    const productType = productTypes.find(type => type.id === item.productTypeId);
                    return (
                        <li key={index}>
                        {productType ? productType.name : "Bilinmeyen ürün"} - {item.quantity}
                        </li>
                    );
                    })}
                </ul>
                </td>
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
export default SupplierOrders;
