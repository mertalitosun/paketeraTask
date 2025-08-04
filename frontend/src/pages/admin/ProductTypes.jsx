import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function ProductTypes() {
  const [productTypes, setProductTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProductTypes = async () => {
    try {
      const res = await axios.get("http://148.230.107.226:4000/admin/product-types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductTypes(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token"); 
        navigate("/login"); 
      } else {
        setMessage("Ürün türleri alınamadı: " + err.message);
      }
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
        "http://148.230.107.226:4000/admin/product-types",
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
    <div className="container py-4" style={{ maxWidth: 800 }}>
    <h2 className="mb-4">Ürün Türleri</h2>
  
    <form className="row g-2 align-items-center mb-4" onSubmit={handleAddType}>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Yeni ürün türü"
          required
        />
      </div>
      <div className="col-sm-4">
        <button type="submit" className="btn btn-primary w-100">
          Ekle
        </button>
      </div>
    </form>
  
    {message && <div className="alert alert-info">{message}</div>}
  
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Ürün Türü</th>
          </tr>
        </thead>
        <tbody>
          {productTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default ProductTypes;
