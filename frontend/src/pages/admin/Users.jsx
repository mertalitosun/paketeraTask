import React, {useState,useEffect} from "react";
import axios from "axios";

function Users() {
    const [users,setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token")
   const getUsers = async() =>{
    try{
        const res = await axios("http://148.230.107.226:4000/admin/users",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(res.data);
    }catch(err){
        setMessage("Kullanıcılar getirilemedi" + err.message);
    }
   }

   useEffect(()=>{
    getUsers();
   },[])

   return (
    <div className="container py-4">
    <h2 className="mb-4">Kullanıcılar</h2>
    {message && <div className="alert alert-info">{message}</div>}
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>İsim</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default Users;
