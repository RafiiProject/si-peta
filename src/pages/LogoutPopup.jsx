import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutPopup.css";

const LogoutPopup = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h2>Konfirmasi Logout</h2>
        <p>Apakah Anda yakin ingin keluar dari sistem?</p>
        <div className="logout-modal-buttons">
          <button className="btn btn-danger" onClick={handleLogout}>
            Ya, Logout
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
