// src/components/LogoutPopup.jsx
import React from "react";
import "./LogoutPopup.css";
import { useNavigate } from "react-router-dom";

const LogoutPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <h3 className="modal-title">Konfirmasi Logout</h3>
        <p className="modal-text">Apakah Anda yakin ingin keluar dari sistem?</p>
        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={handleLogout}>
            Ya, Logout
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
