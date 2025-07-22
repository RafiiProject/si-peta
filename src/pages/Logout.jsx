import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Pastikan ini ada

const Logout = () => {
  const [showPopup] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <>
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">Konfirmasi Logout</h3>
            <p className="modal-text">Apakah Anda yakin ingin keluar dari sistem?</p>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={handleLogout}>
                Ya, Logout
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
