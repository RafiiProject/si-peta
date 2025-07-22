import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost/sipeta-ktp/backend/login.php", {
        email,
        password,
      });

      if (res.data.status === "success") {
        const role = res.data.user.role;
        localStorage.setItem("role", role);
        localStorage.setItem("email", res.data.user.email);

        if (role === "admin") {
          window.location.href = "/";
        } else {
          window.location.href = `/dashboarduser`;
        }
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("email atau password anda salah.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/assets/logoku.png" width="200" alt="Logo" />
        <h1>SiPeta KTP</h1>

        {error && <span>{error}</span>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "35px" }}
            />
            <span
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "16px",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
