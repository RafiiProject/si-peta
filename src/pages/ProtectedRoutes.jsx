// ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    alert("Anda harus login terlebih dahulu.");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    alert("Unauthorized: Anda tidak memiliki akses.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
