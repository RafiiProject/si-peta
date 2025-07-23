import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../pages/banyumanik/Table";
import "./Home.css"; // Tambahkan file CSS untuk styling

const Hbanyumanik = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Banyumanik</div>
        <Table />
      </div>
    </div>
  );
};

export default Hbanyumanik;
