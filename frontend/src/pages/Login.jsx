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
      const res = await axios.post("http://localhost:4000/login", { email, password });
      const token = res.data.token;

      // Token'ı localStorage'a kaydet
      localStorage.setItem("token", token);

      // Token'dan rolü çıkar
      const decoded = jwtDecode(token);
      const role = decoded.role;

      setMessage("Giriş başarılı!");

      // Role göre yönlendir
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
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Şifre:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />
        </div>
        <button type="submit" style={{ padding: 10, width: "100%" }}>Giriş Yap</button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}

export default Login;
