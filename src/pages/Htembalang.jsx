import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../pages/tembalang/Table";
import "./Home.css"; // Tambahkan file CSS untuk styling

const Htembalang = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Table />
      </div>
    </div>
  );
};

export default Htembalang;
