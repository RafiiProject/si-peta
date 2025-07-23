import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Dashboard.css";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import DashboardCharts from "../components/chart/DashboardCharts";
import axios from "axios";

const Dashboard = () => {
  const [kecamatanData, setKecamatanData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/sipeta-ktp/backend/kecamatan_stats.php")
      .then((res) => {
        setKecamatanData(res.data);
      })
      .catch((err) => {
        console.error("Gagal memuat data kecamatan:", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />

        <div className="section-title">TPDK Data Charts</div>
        <DashboardCharts />

        <div className="section-title1">DAFTAR TPDK KECAMATAN</div>
        <div className="card-grid">
          {kecamatanData.map((item, idx) => (
            <Link to={item.path} key={idx} style={{ textDecoration: "none" }}>
              <div className="card">
                <div className="card-icon-ellipse">
                  <div className="card-icon-circle">
                    <BusinessRoundedIcon
                      style={{ fontSize: 60, color: "#dc143c" }}
                    />
                  </div>
                </div>
                <b>{item.label}</b>
                <div className="info-row">
                  <span className="label">Total:</span>
                  <span className="value">{item.total}</span>
                </div>
                <div className="info-row">
                  <span className="label">Data Rusak:</span>
                  <span className="value">{item.rusak}</span>
                </div>
                <span className="card-link">Lihat Data;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
