import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    alert("Anda harus login terlebih dahulu.");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    alert("Unauthorized: Anda tidak memiliki akses.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
