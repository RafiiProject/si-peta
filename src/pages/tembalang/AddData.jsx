import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AddData.css";

const AddData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    keterangan: "",
    tanggal: "",
    file: null,
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, tanggal: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nama") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.keterangan !== "RUSAK" &&
      (!formData.nik || formData.nik.length !== 16 || !formData.nama)
    ) {
      alert("NIK harus 16 digit dan Nama tidak boleh kosong jika keterangan bukan RUSAK!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nik", formData.nik);
    formDataToSend.append("nama", formData.nama);
    formDataToSend.append("keterangan", formData.keterangan);
    formDataToSend.append("tanggal", formData.tanggal);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await fetch("http://localhost/sipeta-ktp/backend/backtembalang/process_add.php", {
        method: "POST",
        body: formDataToSend,
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) throw new Error("Server tidak merespons dengan baik.");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (result.status === "success") {
          alert(result.message);
          navigate("/tembalang");
        } else {
          alert(result.message);
        }
      } else {
        const text = await response.text();
        console.error("Unexpected server response:", text);
        alert("Respon dari server tidak valid JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="adddata-container">
          <div className="adddata-title-card">
            <h2 className="adddata-title">ADD NEW</h2>
            <h4 className="kecamatan-label">Kecamatan Tembalang</h4>
          </div>

          <div className="adddata-card">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-row">
                <div>
                  <label className="form-label">NIK</label>
                  <input
                    type="text"
                    name="nik"
                    className="form-control"
                    value={formData.nik}
                    maxLength="16"
                    pattern="\d{16}"
                    title="Harus 16 digit angka"
                    onChange={handleChange}
                    disabled={formData.keterangan === "RUSAK"}
                    required={formData.keterangan !== "RUSAK"}
                  />
                </div>
                <div>
                  <label className="form-label">NAMA</label>
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    value={formData.nama}
                    onChange={handleChange}
                    disabled={formData.keterangan === "RUSAK"}
                    required={formData.keterangan !== "RUSAK"}
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label className="form-label">Keterangan</label>
                  <select
                    name="keterangan"
                    className="form-control"
                    value={formData.keterangan}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>PILIH KETERANGAN</option>
                    {[
                      "PEMULA", "KEHILANGAN", "CETAK ULANG(CU)", "ONLINE SKD", "ONLINE AKM",
                      "ONLINE BIODATA", "PERUBAHAN DATA", "BANTUAN PINDAH", "GANTI FOTO",
                      "GANTI TTD", "GANTI FOTO + TTD", "SKD + GANTI FOTO", "LD",
                      "RUSAK"
                    ].map((ket) => (
                      <option key={ket} value={ket}>{ket}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Tanggal</label>
                  <input
                    type="date"
                    name="tanggal"
                    className="form-control"
                    value={formData.tanggal}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group mt-3">
                <label className="form-label">Upload File PDF</label>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={formData.keterangan === "RUSAK"}
                />
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-green">SEND</button>
                <button type="button" className="btn btn-red ms-2" onClick={handleCancel}>BATAL</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddData;
