import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Unauthorized from "./pages/Unautorized";

// Dashboard user
import DashboardUser from "./pages/DashboardUser";

// Halaman kecamatan
import Hbanyumanik from "./pages/Hbanyumanik";
import Hbarat from "./pages/Hbarat";
import Hcandisari from "./pages/Hcandisari";
import Hdinas from "./pages/Hdinas";
import Hgajahmungkur from "./pages/Hgajahmungkur";
import Hgenuk from "./pages/Hgenuk";
import Hgunungpati from "./pages/Hgunungpati";
import Hmijen from "./pages/Hmijen";
import Hngaliyan from "./pages/Hngaliyan";
import Hpedurungan from "./pages/Hpedurungan";
import Hselatan from "./pages/Hselatan";
import Htembalang from "./pages/Htembalang";
import Htimur from "./pages/Htimur";
import Htugu from "./pages/Htugu";
import Hutara from "./pages/Hutara";

// Add Data
import AddData from "./pages/tengah/AddData";
import AddDatabanyumanik from "./pages/banyumanik/AddData";
import AddDatabarat from "./pages/barat/AddData";
import AddDatacandisari from "./pages/candisari/AddData";
import AddDatadinas from "./pages/dinas/AddData";
import AddDatagajahmungkur from "./pages/gajahmungkur/AddData";
import AddDatagenuk from "./pages/genuk/AddData";
import AddDatagunungpati from "./pages/gunungpati/AddData";
import AddDatamijen from "./pages/mijen/AddData";
import AddDatangaliyan from "./pages/ngaliyan/AddData";
import AddDatapedurungan from "./pages/pedurungan/AddData";
import AddDataselatan from "./pages/selatan/AddData";
import AddDatatembalang from "./pages/tembalang/AddData";
import AddDatatimur from "./pages/timur/AddData";
import AddDatatugu from "./pages/tugu/AddData";
import AddDatautara from "./pages/utara/AddData";

// View Data
import ViewData from "./pages/tengah/ViewData";
import ViewDatabanyumanik from "./pages/banyumanik/ViewData";
import ViewDatabarat from "./pages/barat/ViewData";
import ViewDatacandisari from "./pages/candisari/ViewData";
import ViewDatadinas from "./pages/dinas/ViewData";
import ViewDatagajahmungkur from "./pages/gajahmungkur/ViewData";
import ViewDatagenuk from "./pages/genuk/ViewData";
import ViewDatagunungpati from "./pages/gunungpati/ViewData";
import ViewDatamijen from "./pages/mijen/ViewData";
import ViewDatangaliyan from "./pages/ngaliyan/ViewData";
import ViewDatapedurungan from "./pages/pedurungan/ViewData";
import ViewDataselatan from "./pages/selatan/ViewData";
import ViewDatatembalang from "./pages/tembalang/ViewData";
import ViewDatatimur from "./pages/timur/ViewData";
import ViewDatatugu from "./pages/tugu/ViewData";
import ViewDatautara from "./pages/utara/ViewData";

// Delete Data
import DeleteData from "./pages/tengah/DeleteData";
import DeleteDatatimur from "./pages/timur/DeleteData";
import DeleteDatautara from "./pages/utara/DeleteData";
import DeleteDatabarat from "./pages/barat/DeleteData";
import DeleteDataselatan from "./pages/selatan/DeleteData";
import DeleteDatagenuk from "./pages/genuk/DeleteData";
import DeleteDatatembalang from "./pages/tembalang/DeleteData";
import DeleteDatapedurungan from "./pages/pedurungan/DeleteData";
import DeleteDatacandisari from "./pages/candisari/DeleteData";
import DeleteDatagajahmungkur from "./pages/gajahmungkur/DeleteData";
import DeleteDatabanyumanik from "./pages/banyumanik/DeleteData";
import DeleteDatagunungpati from "./pages/gunungpati/DeleteData";
import DeleteDatadinas from "./pages/dinas/DeleteData";
import DeleteDatatugu from "./pages/tugu/DeleteData";
import DeleteDatamijen from "./pages/mijen/DeleteData";
import DeleteDatangaliyan from "./pages/ngaliyan/DeleteData";

// Komponen proteksi
const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  const loginTime = localStorage.getItem("loginTime");
  const maxIdleTime = 15 * 60 * 1000; // 15 menit

  if (!role || !loginTime) {
    return <Navigate to="/login" replace />;
  }

  if (Date.now() - loginTime > maxIdleTime) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


const App = () => {
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("loginTime", Date.now());
    };
  
    const checkIdle = () => {
      const loginTime = localStorage.getItem("loginTime");
      const maxIdleTime = 15 * 60 * 1000; // 15 menit
      if (loginTime && Date.now() - loginTime > maxIdleTime) {
        localStorage.clear();
        window.location.href = "/logout"; // langsung logout
      }
    };
  
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
  
    const interval = setInterval(checkIdle, 30000); // cek setiap 30 detik
  
    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Halaman Auth tidak dibungkus */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Halaman admin */}
        <Route path="/" element={<PrivateRoute allowedRoles={["admin"]}><Dashboard /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute allowedRoles={["admin"]}><Register /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute allowedRoles={["admin"]}><UserList /></PrivateRoute>} />
        <Route path="/edit-user/:id" element={<PrivateRoute allowedRoles={["admin"]}><EditUser /></PrivateRoute>} />

        {/* Dashboard user */}
        <Route path="/dashboarduser" element={
          <PrivateRoute allowedRoles={["tengah", "utara", "selatan", "barat", "timur", "genuk", "tembalang", "pedurungan", "candisari", "gajahmungkur", "banyumanik", "gunungpati", "dinas", "tugu", "mijen", "ngaliyan"]}>
            <DashboardUser />
          </PrivateRoute>
        } />

        {/* Halaman per kecamatan */}
        <Route path="/tengah" element={<PrivateRoute allowedRoles={["admin", "tengah"]}><Home /></PrivateRoute>} />
        <Route path="/add-data" element={<PrivateRoute allowedRoles={["admin", "tengah"]}><AddData /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute allowedRoles={["admin", "tengah"]}><ViewData /></PrivateRoute>} />
        <Route path="/delete/:id" element={<PrivateRoute allowedRoles={["admin", "tengah"]}><DeleteData /></PrivateRoute>} />

        {/* Semua rute kecamatan lainnya (tanpa menghilangkan apapun) */}
        <Route path="/banyumanik" element={<PrivateRoute allowedRoles={["admin", "banyumanik"]}><Hbanyumanik /></PrivateRoute>} />
        <Route path="/barat" element={<PrivateRoute allowedRoles={["admin", "barat"]}><Hbarat /></PrivateRoute>} />
        <Route path="/candisari" element={<PrivateRoute allowedRoles={["admin", "candisari"]}><Hcandisari /></PrivateRoute>} />
        <Route path="/dinas" element={<PrivateRoute allowedRoles={["admin", "dinas"]}><Hdinas /></PrivateRoute>} />
        <Route path="/gajahmungkur" element={<PrivateRoute allowedRoles={["admin", "gajahmungkur"]}><Hgajahmungkur /></PrivateRoute>} />
        <Route path="/genuk" element={<PrivateRoute allowedRoles={["admin", "genuk"]}><Hgenuk /></PrivateRoute>} />
        <Route path="/gunungpati" element={<PrivateRoute allowedRoles={["admin", "gunungpati"]}><Hgunungpati /></PrivateRoute>} />
        <Route path="/mijen" element={<PrivateRoute allowedRoles={["admin", "mijen"]}><Hmijen /></PrivateRoute>} />
        <Route path="/ngaliyan" element={<PrivateRoute allowedRoles={["admin", "ngaliyan"]}><Hngaliyan /></PrivateRoute>} />
        <Route path="/pedurungan" element={<PrivateRoute allowedRoles={["admin", "pedurungan"]}><Hpedurungan /></PrivateRoute>} />
        <Route path="/selatan" element={<PrivateRoute allowedRoles={["admin", "selatan"]}><Hselatan /></PrivateRoute>} />
        <Route path="/tembalang" element={<PrivateRoute allowedRoles={["admin", "tembalang"]}><Htembalang /></PrivateRoute>} />
        <Route path="/timur" element={<PrivateRoute allowedRoles={["admin", "timur"]}><Htimur /></PrivateRoute>} />
        <Route path="/tugu" element={<PrivateRoute allowedRoles={["admin", "tugu"]}><Htugu /></PrivateRoute>} />
        <Route path="/utara" element={<PrivateRoute allowedRoles={["admin", "utara"]}><Hutara /></PrivateRoute>} />

        {/* Add, View, Delete untuk semua kecamatan — dibungkus PrivateRoute */}
        <Route path="/add-data/banyumanik" element={<PrivateRoute allowedRoles={["admin", "banyumanik"]}><AddDatabanyumanik /></PrivateRoute>} />
        <Route path="/add-data/barat" element={<PrivateRoute allowedRoles={["admin", "barat"]}><AddDatabarat /></PrivateRoute>} />
        <Route path="/add-data/candisari" element={<PrivateRoute allowedRoles={["admin", "candisari"]}><AddDatacandisari /></PrivateRoute>} />
        <Route path="/add-data/dinas" element={<PrivateRoute allowedRoles={["admin", "dinas"]}><AddDatadinas /></PrivateRoute>} />
        <Route path="/add-data/gajahmungkur" element={<PrivateRoute allowedRoles={["admin", "gajahmungkur"]}><AddDatagajahmungkur /></PrivateRoute>} />
        <Route path="/add-data/genuk" element={<PrivateRoute allowedRoles={["admin", "genuk"]}><AddDatagenuk /></PrivateRoute>} />
        <Route path="/add-data/gunungpati" element={<PrivateRoute allowedRoles={["admin", "gunungpati"]}><AddDatagunungpati /></PrivateRoute>} />
        <Route path="/add-data/mijen" element={<PrivateRoute allowedRoles={["admin", "mijen"]}><AddDatamijen /></PrivateRoute>} />
        <Route path="/add-data/ngaliyan" element={<PrivateRoute allowedRoles={["admin", "ngaliyan"]}><AddDatangaliyan /></PrivateRoute>} />
        <Route path="/add-data/pedurungan" element={<PrivateRoute allowedRoles={["admin", "pedurungan"]}><AddDatapedurungan /></PrivateRoute>} />
        <Route path="/add-data/selatan" element={<PrivateRoute allowedRoles={["admin", "selatan"]}><AddDataselatan /></PrivateRoute>} />
        <Route path="/add-data/tembalang" element={<PrivateRoute allowedRoles={["admin", "tembalang"]}><AddDatatembalang /></PrivateRoute>} />
        <Route path="/add-data/timur" element={<PrivateRoute allowedRoles={["admin", "timur"]}><AddDatatimur /></PrivateRoute>} />
        <Route path="/add-data/tugu" element={<PrivateRoute allowedRoles={["admin", "tugu"]}><AddDatatugu /></PrivateRoute>} />
        <Route path="/add-data/utara" element={<PrivateRoute allowedRoles={["admin", "utara"]}><AddDatautara /></PrivateRoute>} />

        <Route path="/view/banyumanik/:id" element={<PrivateRoute allowedRoles={["admin", "banyumanik"]}><ViewDatabanyumanik /></PrivateRoute>} />
        <Route path="/view/barat/:id" element={<PrivateRoute allowedRoles={["admin", "barat"]}><ViewDatabarat /></PrivateRoute>} />
        <Route path="/view/candisari/:id" element={<PrivateRoute allowedRoles={["admin", "candisari"]}><ViewDatacandisari /></PrivateRoute>} />
        <Route path="/view/dinas/:id" element={<PrivateRoute allowedRoles={["admin", "dinas"]}><ViewDatadinas /></PrivateRoute>} />
        <Route path="/view/gajahmungkur/:id" element={<PrivateRoute allowedRoles={["admin", "gajahmungkur"]}><ViewDatagajahmungkur /></PrivateRoute>} />
        <Route path="/view/genuk/:id" element={<PrivateRoute allowedRoles={["admin", "genuk"]}><ViewDatagenuk /></PrivateRoute>} />
        <Route path="/view/gunungpati/:id" element={<PrivateRoute allowedRoles={["admin", "gunungpati"]}><ViewDatagunungpati /></PrivateRoute>} />
        <Route path="/view/mijen/:id" element={<PrivateRoute allowedRoles={["admin", "mijen"]}><ViewDatamijen /></PrivateRoute>} />
        <Route path="/view/ngaliyan/:id" element={<PrivateRoute allowedRoles={["admin", "ngaliyan"]}><ViewDatangaliyan /></PrivateRoute>} />
        <Route path="/view/pedurungan/:id" element={<PrivateRoute allowedRoles={["admin", "pedurungan"]}><ViewDatapedurungan /></PrivateRoute>} />
        <Route path="/view/selatan/:id" element={<PrivateRoute allowedRoles={["admin", "selatan"]}><ViewDataselatan /></PrivateRoute>} />
        <Route path="/view/tembalang/:id" element={<PrivateRoute allowedRoles={["admin", "tembalang"]}><ViewDatatembalang /></PrivateRoute>} />
        <Route path="/view/timur/:id" element={<PrivateRoute allowedRoles={["admin", "timur"]}><ViewDatatimur /></PrivateRoute>} />
        <Route path="/view/tugu/:id" element={<PrivateRoute allowedRoles={["admin", "tugu"]}><ViewDatatugu /></PrivateRoute>} />
        <Route path="/view/utara/:id" element={<PrivateRoute allowedRoles={["admin", "utara"]}><ViewDatautara /></PrivateRoute>} />

        <Route path="/delete/banyumanik/:id" element={<PrivateRoute allowedRoles={["admin", "banyumanik"]}><DeleteDatabanyumanik /></PrivateRoute>} />
        <Route path="/delete/barat/:id" element={<PrivateRoute allowedRoles={["admin", "barat"]}><DeleteDatabarat /></PrivateRoute>} />
        <Route path="/delete/candisari/:id" element={<PrivateRoute allowedRoles={["admin", "candisari"]}><DeleteDatacandisari /></PrivateRoute>} />
        <Route path="/delete/dinas/:id" element={<PrivateRoute allowedRoles={["admin", "dinas"]}><DeleteDatadinas /></PrivateRoute>} />
        <Route path="/delete/gajahmungkur/:id" element={<PrivateRoute allowedRoles={["admin", "gajahmungkur"]}><DeleteDatagajahmungkur /></PrivateRoute>} />
        <Route path="/delete/genuk/:id" element={<PrivateRoute allowedRoles={["admin", "genuk"]}><DeleteDatagenuk /></PrivateRoute>} />
        <Route path="/delete/gunungpati/:id" element={<PrivateRoute allowedRoles={["admin", "gunungpati"]}><DeleteDatagunungpati /></PrivateRoute>} />
        <Route path="/delete/mijen/:id" element={<PrivateRoute allowedRoles={["admin", "mijen"]}><DeleteDatamijen /></PrivateRoute>} />
        <Route path="/delete/ngaliyan/:id" element={<PrivateRoute allowedRoles={["admin", "ngaliyan"]}><DeleteDatangaliyan /></PrivateRoute>} />
        <Route path="/delete/pedurungan/:id" element={<PrivateRoute allowedRoles={["admin", "pedurungan"]}><DeleteDatapedurungan /></PrivateRoute>} />
        <Route path="/delete/selatan/:id" element={<PrivateRoute allowedRoles={["admin", "selatan"]}><DeleteDataselatan /></PrivateRoute>} />
        <Route path="/delete/tembalang/:id" element={<PrivateRoute allowedRoles={["admin", "tembalang"]}><DeleteDatatembalang /></PrivateRoute>} />
        <Route path="/delete/timur/:id" element={<PrivateRoute allowedRoles={["admin", "timur"]}><DeleteDatatimur /></PrivateRoute>} />
        <Route path="/delete/tugu/:id" element={<PrivateRoute allowedRoles={["admin", "tugu"]}><DeleteDatatugu /></PrivateRoute>} />
        <Route path="/delete/utara/:id" element={<PrivateRoute allowedRoles={["admin", "utara"]}><DeleteDatautara /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
