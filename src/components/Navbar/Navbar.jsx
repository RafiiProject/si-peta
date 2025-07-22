import React from "react";
import "./Navbar.css"; // pastikan file ini ada

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <div className="title">SiPeta KTP</div>
          <div className="arsip">Arsip Pencetakan KTP</div>
        </div>
        <div className="items">
          <div className="item">
            <i className="fa-regular fa-moon"></i>
          </div>
          <div className="item">
            <img
              src="/assets/logo-new.png"
              alt="Logo"
              width="300"
              height="50"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
