import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const ViewData = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost/sipeta-ktp/backend/backcandisari/get_by_id.php?id=${id}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal ambil data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleViewPDF = () => {
    if (!data?.file_data) return;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${data.file_data}'></iframe>`
    );
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!data) {
    return <div className="container">Data tidak ditemukan.</div>;
  }

  return (
    <div className="app d-flex">
      <Sidebar />

      <div className="main-content flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8">
              <div className="card p-4">
                <h4 className="text-center">{data.keterangan}</h4>
                <hr />
                <p><strong>NIK:</strong><br />{data.nik}</p>
                <p><strong>Nama:</strong><br />{data.nama}</p>
                <p><strong>Tanggal:</strong><br />{data.tanggal}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 text-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                  alt="PDF Icon"
                  width="80"
                  height="80"
                />
                <h5 className="mt-2">PDF File</h5>
                <button
                  onClick={handleViewPDF}
                  className={`btn mt-2 ${data.file_data ? "btn-primary" : "btn-secondary"}`}
                  disabled={!data.file_data}
                >
                  {data.file_data ? "Lihat PDF" : "Tidak Ada File"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => navigate("/candisari")} className="btn btn-secondary">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
