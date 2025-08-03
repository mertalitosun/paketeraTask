import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateOrder() {
  const [productTypes, setProductTypes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  
 
    const fetchProductTypes = async () => {
        try {
        const res = await axios.get("http://localhost:4000/customer/product-types", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProductTypes(res.data);

        const initialQuantities = {};
        res.data.forEach(pt => {
            initialQuantities[pt.id] = 0;
        });
        setQuantities(initialQuantities);
        } catch (err) {
        setMessage("Ürün türleri alınamadı.");
        }
    };

    useEffect(() => {
        fetchProductTypes();
    }, []);
    


  const quantityChange = (productTypeId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productTypeId]: parseInt(value, 10) || 0
    }));
  };

  // Sipariş gönder
  const formSumbit = async (e) => {
    e.preventDefault();
    const selectedItems = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([productTypeId, qty]) => ({
        productTypeId: parseInt(productTypeId),
        quantity: qty
      }));

    if (selectedItems.length === 0) {
      return setMessage("En az bir ürün adedi girmelisiniz.");
    }

    try {
      const res = await axios.post("http://localhost:4000/customer/order-requests", {
        items: selectedItems,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("Sipariş başarıyla oluşturuldu.");
      setQuantities(prev => {
        const reset = {};
        Object.keys(prev).forEach(key => {
          reset[key] = 0;
        });
        return reset;
      });
    } catch (err) {
      setMessage("Sipariş oluşturulamadı: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Sipariş Talebi Oluştur</h2>

      <form onSubmit={formSumbit}>
        {productTypes.map((type) => (
          <div key={type.id} style={{ marginBottom: 10 }}>
            <label>{type.name}:</label>
            <input
              type="number"
              min="0"
              value={quantities[type.id] || 0}
              onChange={(e) => quantityChange(type.id, e.target.value)}
              style={{ marginLeft: 10, padding: 5, width: 60 }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: 10, marginTop: 10 }}>
          Siparişi Gönder
        </button>
      </form>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}

export default CreateOrder;
