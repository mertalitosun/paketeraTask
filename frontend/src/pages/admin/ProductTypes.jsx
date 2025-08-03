import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductTypes() {
  const [productTypes, setProductTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchProductTypes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/product-types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductTypes(res.data);
    } catch (err) {
      setMessage("Ürün türleri alınamadı: " + err.message);
    }
  };

  // İlk render'da verileri çek
  useEffect(() => {
    fetchProductTypes();
  }, []);

  // Yeni ürün türü ekleme
  const handleAddType = async (e) => {
    e.preventDefault();
    if (!newType.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/admin/product-types",
        { name: newType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setNewType("");
      fetchProductTypes(); 
    } catch (err) {
      setMessage("Ekleme başarısız: " + (err.message));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Ürün Türleri</h2>
      <form onSubmit={handleAddType}>
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Yeni ürün türü"
          style={{ padding: 8, width: "70%", marginRight: 10 }}
        />
        <button type="submit" style={{ padding: 8 }}>
          Ekle
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      <ul style={{ marginTop: 20 }}>
        {productTypes.map((type) => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductTypes;
