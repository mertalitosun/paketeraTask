import React, {useState,useEffect} from "react";
import axios from "axios";

function Customers() {
    const [customers,setCustomers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token")
   const getCustomers = async() =>{
    try{
        const res = await axios("http://localhost:4000/admin/customers",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setCustomers(res.data);
    }catch(err){
        setMessage("Kullanıcılar getirilemedi" + err.message);
    }
   }

   useEffect(()=>{
    getCustomers();
   },[])

   return (
    <div style={{ padding: "20px" }}>
      <h2>Müşteriler</h2>
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
          {customers.map((customer, i) => (
            <tr key={customer.id}>
              <td>{i + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
