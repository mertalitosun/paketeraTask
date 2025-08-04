import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://148.230.107.226:4000/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      setMessage("Giriş başarılı!");

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "customer") {
        navigate("/customer");
      } else if (role === "supplier") {
        navigate("/supplier");
      } else {
        setMessage("Tanımlanamayan rol!");
      }

    } catch (error) {
      setMessage("Giriş başarısız: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Şifre:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Login;
