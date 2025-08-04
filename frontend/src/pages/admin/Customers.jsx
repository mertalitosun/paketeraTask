import React, {useState,useEffect} from "react";
import axios from "axios";

function Customers() {
    const [customers,setCustomers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token")
   const getCustomers = async() =>{
    try{
        const res = await axios("http://148.230.107.226:4000/admin/customers",{
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
    <div className="container py-4">
    <h2 className="mb-4">Müşteriler</h2>
  
    {message && <div className="alert alert-warning">{message}</div>}
  
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">İsim</th>
            <th scope="col">Email</th>
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
  </div>
  
  );
}

export default Customers;
