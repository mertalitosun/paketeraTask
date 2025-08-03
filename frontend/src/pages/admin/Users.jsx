import React, {useState,useEffect} from "react";
import axios from "axios";

function Users() {
    const [users,setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token")
   const getUsers = async() =>{
    try{
        const res = await axios("http://localhost:4000/admin/users",{
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
    <div style={{ padding: "20px" }}>
      <h2>Kullanıcılar</h2>
      {message && <p>{message}</p>}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
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
  );
}

export default Users;
