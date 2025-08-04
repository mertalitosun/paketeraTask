import React, {useState,useEffect} from "react";
import axios from "axios";

function Suppliers() {
    const [suppliers,setSuppliers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token")
   const getSuppliers = async() =>{
    try{
        const res = await axios("/admin/suppliers",{
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
    <div className="container py-4">
    <h2 className="mb-4">Tedarikçiler</h2>
    {message && <div className="alert alert-info">{message}</div>}
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
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
  </div>
  
  );
}

export default Suppliers;
