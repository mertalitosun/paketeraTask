import React, {useState,useEffect} from "react";
import axios from "axios";

function Suppliers() {
    const [suppliers,setSuppliers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token")
   const getSuppliers = async() =>{
    try{
        const res = await axios("http://localhost:4000/admin/suppliers",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setSuppliers(res.data);
    }catch(err){
        setMessage("Kullanıcılar getirilemedi" + err.message);
    }
   }

   useEffect(()=>{
    getSuppliers();
   },[])

   return (
    <div style={{ padding: "20px" }}>
      <h2>Tedarikçiler</h2>
      {message && <p>{message}</p>}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>İsim</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, i) => (
            <tr key={supplier.id}>
              <td>{i + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
