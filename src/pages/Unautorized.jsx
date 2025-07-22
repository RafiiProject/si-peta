import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Akses Ditolak</h1>
      <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <a href="/">Kembali ke Beranda</a>
    </div>
  );
};

export default Unauthorized;
