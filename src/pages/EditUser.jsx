import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Tambahkan ini
import "./Register.css"; // gunakan styling yang sama

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👈 State untuk toggle password

  useEffect(() => {
    axios
      .get(`http://localhost/sipeta-ktp/backend/users.php?id=${id}`)
      .then((res) => {
        setForm({
          email: res.data.email,
          password: "",
          role: res.data.role,
        });
      })
      .catch((err) => console.error("Gagal memuat user:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost/sipeta-ktp/backend/users.php", {
        id,
        email: form.email,
        role: form.role,
        password: form.password,
      });
      alert("User berhasil diperbarui");
      navigate("/user");
    } catch (err) {
      alert("Gagal memperbarui user");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="register-wrapper">
          <h2 className="register-title">Edit Pengguna</h2>
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <label>Password (Kosongkan jika tidak ingin diganti)</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    style={{ paddingRight: "35px" }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
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
                    name="role"
                    value={form.role}
                    onChange={handleChange}
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
                <button type="submit" className="btn btn-green">Simpan</button>
                <button
                  type="button"
                  className="btn btn-red"
                  onClick={() => navigate("/user")}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
