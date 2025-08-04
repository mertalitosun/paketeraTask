import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateOrder() {
  const [productTypes, setProductTypes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  
 
    const fetchProductTypes = async () => {
        try {
        const res = await axios.get("http://148.230.107.226:4000/customer/product-types", {
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
      const res = await axios.post("http://148.230.107.226:4000/customer/order-requests", {
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
    <div className="container" style={{ maxWidth: 600 }}>
  <h2 className="my-4">Sipariş Talebi Oluştur</h2>

  <form onSubmit={formSumbit}>
    {productTypes.map((type) => (
      <div className="mb-3 row align-items-center" key={type.id}>
        <label className="col-sm-8 col-form-label">{type.name}:</label>
        <div className="col-sm-4">
          <input
            type="number"
            min="0"
            value={quantities[type.id] || 0}
            onChange={(e) => quantityChange(type.id, e.target.value)}
            className="form-control"
            style={{ maxWidth: 100 }}
          />
        </div>
      </div>
    ))}

    <button type="submit" className="btn btn-primary mt-3">
      Siparişi Gönder
    </button>
  </form>

  {message && <p className="mt-4 text-danger">{message}</p>}
</div>

  );
}

export default CreateOrder;
