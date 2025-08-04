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
      const res = await axios.get("http://148.230.107.226:4000/supplier/product-types", {
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
      let url = "http://148.230.107.226:4000/supplier/order-requests";
  
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
    <div className="container" style={{ maxWidth: 900 }}>
    <h2 className="my-4">Talepler</h2>
  
    <div className="mb-3">
      <strong>Ürün Türlerine Göre Filtrele:</strong><br />
      {productTypes.map((type) => (
        <div key={type.id} className="form-check form-check-inline me-3">
          <input
            className="form-check-input"
            type="checkbox"
            id={`type-${type.id}`}
            value={type.id}
            checked={selectedTypes.includes(type.id)}
            onChange={() => handleCheckboxChange(type.id)}
          />
          <label className="form-check-label" htmlFor={`type-${type.id}`}>
            {type.name}
          </label>
        </div>
      ))}
      <button className="btn btn-primary ms-3" onClick={fetchOrders}>
        Filtrele
      </button>
    </div>
  
    {message && <p className="text-danger">{message}</p>}
  
    <table className="table table-bordered table-striped mt-3">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Tarih</th>
          <th>Ürünler</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
            <td>
              <ul className="mb-0 ps-3">
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
            <td>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/supplier/orders/${order.id}`)}>
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
export default SupplierOrders;
