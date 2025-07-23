import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../pages/candisari/Table";
import "./Home.css"; // Tambahkan file CSS untuk styling

const Hcandisari = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Candisari</div>
        <Table />
      </div>
    </div>
  );
};

export default Hcandisari;
