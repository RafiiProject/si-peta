import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const kecamatanPages = {
    tengah: { name: "Semarang Tengah", icon: <BusinessRoundedIcon /> },
    utara: { name: "Semarang Utara", icon: <BusinessRoundedIcon /> },
    selatan: { name: "Semarang Selatan", icon: <BusinessRoundedIcon /> },
    timur: { name: "Semarang Timur", icon: <BusinessRoundedIcon /> },
    barat: { name: "Semarang Barat", icon: <BusinessRoundedIcon /> },
    genuk: { name: "Genuk", icon: <BusinessRoundedIcon /> },
    tembalang: { name: "Tembalang", icon: <BusinessRoundedIcon /> },
    pedurungan: { name: "Pedurungan", icon: <BusinessRoundedIcon /> },
    candisari: { name: "Candisari", icon: <BusinessRoundedIcon /> },
    gajahmungkur: { name: "Gajah Mungkur", icon: <BusinessRoundedIcon /> },
    banyumanik: { name: "Banyumanik", icon: <BusinessRoundedIcon /> },
    gunungpati: { name: "Gunung Pati", icon: <BusinessRoundedIcon /> },
    dinas: { name: "Gayamsari/Dinas", icon: <BusinessRoundedIcon /> },
    tugu: { name: "Tugu", icon: <BusinessRoundedIcon /> },
    mijen: { name: "Mijen", icon: <BusinessRoundedIcon /> },
    ngaliyan: { name: "Ngaliyan", icon: <BusinessRoundedIcon /> },
  };

  const isAdmin = role === "admin";
  const isKecamatan = role && Object.keys(kecamatanPages).includes(role);
  const basePath = currentPath.split("/")[1];

  return (
    <>
  {isMobile && (
    <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
      <MenuIcon />
    </button>
  )}

  <div className={`sidebar ${isMobile ? (isSidebarVisible ? "show" : "hidden") : ""}`}>
    <div>
      <div className="logo-container">
        <img src="/assets/logoku.png" alt="Logo" height="65" />
      </div>

      <div className="sidebar-menu">
        {(isAdmin || isKecamatan) && (
          <Link
            to={isAdmin ? "/" : "/dashboarduser"}
            className={
              currentPath === (isAdmin ? "/" : "/dashboarduser") ? "active" : ""
            }
          >
            <DashboardIcon className="icon" /> Dashboard
          </Link>
        )}

        {isAdmin && (
          <Link to="/user" className={basePath === "user" ? "active" : ""}>
            <GroupIcon className="icon" /> Manajemen Pengguna
          </Link>
        )}

        {isAdmin && (
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div
              className={`dropdown-title ${
                Object.keys(kecamatanPages).includes(basePath) ? "active" : ""
              }`}
            >
              <LocationOnIcon className="icon" />
              {Object.keys(kecamatanPages).includes(basePath)
                ? kecamatanPages[basePath].name
                : "TPDK KECAMATAN"}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {Object.entries(kecamatanPages).map(([key, { name, icon }]) => (
                  <Link
                    key={key}
                    to={`/${key}`}
                    className={basePath === key ? "active" : ""}
                  >
                    {icon} {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {isKecamatan && (
          <Link to={`/${role}`} className={basePath === role ? "active" : ""}>
            {kecamatanPages[role]?.icon || <BusinessRoundedIcon />}{" "}
            {kecamatanPages[role]?.name || role}
          </Link>
        )}
      </div>
    </div>

    <div className="sidebar-footer">
      <div className="profile-info">
        {isAdmin ? (
          <>
            <div className="profile-icon-wrapper">
              <AdminPanelSettingsIcon className="icon-role" />
            </div>
            <div className="profile-texts">
              <span className="role-text">Admin</span>
              <span className="sub-role-text">Pengelola</span>
            </div>
          </>
        ) : isKecamatan ? (
          <>
            <div className="profile-icon-wrapper">
              <PersonPinIcon className="icon-role" />
            </div>
            <div className="profile-texts">
              <span className="role-text">{kecamatanPages[role]?.name}</span>
              <span className="sub-role-text">Petugas</span>
            </div>
          </>
        ) : (
          <>
            <div className="profile-icon-wrapper">
              <PersonPinIcon className="icon-role" />
            </div>
            <div className="profile-texts">
              <span className="role-text">Pengguna</span>
            </div>
          </>
        )}
      </div>
      <Link to="/logout" className="text">
        <ExitToAppIcon className="icon" /> Logout
      </Link>
    </div>
  </div>
</>
  );}

export default Sidebar;
