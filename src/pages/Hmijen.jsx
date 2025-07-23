import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../pages/mijen/Table";
import "./Home.css"; // Tambahkan file CSS untuk styling

const Hmijen = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Mijen</div>
        <Table />
      </div>
    </div>
  );
};

export default Hmijen;
