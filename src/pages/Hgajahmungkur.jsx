import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../pages/gajahmungkur/Table";
import "./Home.css"; // Tambahkan file CSS untuk styling

const Hgajahmungkur = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Gajahmungkur</div>
        <Table />
      </div>
    </div>
  );
};

export default Hgajahmungkur;
