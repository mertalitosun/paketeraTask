import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductTypes() {
  const [productTypes, setProductTypes] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchProductTypes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/customer/product-types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductTypes(res.data);
    } catch (err) {
      setMessage("Ürün türleri alınamadı: " + err.message);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Ürün Türleri</h2>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: 10 }}>Ürün Türü</th>
          </tr>
        </thead>
        <tbody>
          {productTypes.map((type) => (
            <tr key={type.id}>
              <td style={{ border: "1px solid #ddd", padding: 10 }}>{type.id}</td>
              <td style={{ border: "1px solid #ddd", padding: 10 }}>{type.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTypes;
