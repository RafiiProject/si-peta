import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader" />
      <p className="loading-text">Memuat...</p>
    </div>
  );
};

export default Loader;
