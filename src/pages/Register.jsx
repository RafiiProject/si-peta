import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost/sipeta-ktp/backend/register.php", {
        email,
        password,
        role,
      });

      if (res.data.status === "success") {
        alert("Pengguna berhasil ditambahkan");
        navigate("/user");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // kembali ke halaman sebelumnya
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="register-wrapper">
          <h2 className="register-title">Tambah Pengguna</h2>
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: "35px" }}
                  />
                  <span
                    onClick={toggleShowPassword}
                    style={{
                      position: "absolute",
                      top: "65%",
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
                <div className="full-width">
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Pilih Role</option>
                    <option value="admin">Admin</option>
                    <option value="tengah">Semarang Tengah</option>
                    <option value="utara">Semarang Utara</option>
                    <option value="selatan">Semarang Selatan</option>
                    <option value="timur">Semarang Timur</option>
                    <option value="barat">Semarang Barat</option>
                    <option value="genuk">Genuk</option>
                    <option value="tembalang">Tembalang</option>
                    <option value="pedurungan">Pedurungan</option>
                    <option value="candisari">Candisari</option>
                    <option value="gajahmungkur">Gajah Mungkur</option>
                    <option value="banyumanik">Banyumanik</option>
                    <option value="gunungpati">Gunung Pati</option>
                    <option value="mijen">Mijen</option>
                    <option value="ngaliyan">Ngaliyan</option>
                    <option value="dinas">Dinas</option>
                    <option value="tugu">Tugu</option>
                  </select>
                </div>
              </div>
              <div className="button-group">
                <button type="submit" className="btn btn-green">Tambah</button>
                <button type="button" className="btn btn-red" onClick={handleCancel}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
