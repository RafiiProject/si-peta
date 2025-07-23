import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../pages/gunungpati/Table";
import "./Home.css"; // Tambahkan file CSS untuk styling

const Hgunungpati = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Gunung Pati</div>
        <Table />
      </div>
    </div>
  );
};

export default Hgunungpati;
