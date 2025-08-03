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
    <div className="container my-4">
  <h2>Ürün Türleri</h2>

  {message && <p className="mt-3 text-danger">{message}</p>}

  <table className="table table-bordered table-striped mt-4">
    <thead className="table-light">
      <tr>
        <th>ID</th>
        <th>Ürün Türü</th>
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

  );
}

export default ProductTypes;
