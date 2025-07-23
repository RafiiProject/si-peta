// components/IdleLogoutModal.jsx
import React, { useEffect, useState } from "react";

const IdleLogoutModal = ({ show, onStay, onLogout }) => {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (!show) return;

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [show, onLogout]);

  useEffect(() => {
    if (!show) setSecondsLeft(30);
  }, [show]);

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Anda akan logout otomatis!</h2>
        <p>Anda tidak aktif selama 15 menit. Anda akan logout dalam <strong>{secondsLeft}</strong> detik.</p>
        <button onClick={onStay} style={buttonStyle}>Tetap di sini</button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  width: "350px",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  marginTop: "20px",
  cursor: "pointer",
};

export default IdleLogoutModal;
