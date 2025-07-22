import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChartSection from "../../components/chart/ChartSection";
import "./Table.css";

const Table = () => {
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost/sipeta-ktp/backend/backpedurungan/get_data.php")
        .then((response) => {
          if (!Array.isArray(response.data)) {
            throw new Error("Invalid JSON format");
          }
          setAllData(response.data);
        })
        .catch((error) => {
          console.error("Gagal mengambil data:", error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const isFiltered = search || date;

  const filteredData = allData
    .filter((item) => {
      const matchSearch =
        !search ||
        item.nik?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama?.toLowerCase().includes(search.toLowerCase());
      const matchDate = !date || item.tanggal === date;
      return matchSearch && matchDate;
    })
    .sort((a, b) => {
      if (isFiltered) {
        return parseInt(a.id) - parseInt(b.id); // Urutan lama → baru
      } else {
        const dateDiff = new Date(b.tanggal) - new Date(a.tanggal);
        if (dateDiff === 0) {
          return parseInt(b.id) - parseInt(a.id); // Urutan baru → lama jika tanggal sama
        }
        return dateDiff;
      }
    });

  const todayStr = new Date().toISOString().slice(0, 10);

  const countMasuk = filteredData.filter((item) => item.keterangan !== "RUSAK").length;
  const countRusak = filteredData.filter((item) => item.keterangan === "RUSAK").length;

  const dataMasukToday = filteredData.filter(
    (item) => item.tanggal === todayStr && item.keterangan !== "RUSAK"
  ).length;

  const rusakToday = filteredData.filter(
    (item) => item.tanggal === todayStr && item.keterangan === "RUSAK"
  ).length;

  const chartDataPerMonth = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateString = date.toISOString().slice(0, 10);
    const masuk = allData.filter((item) => item.tanggal === dateString && item.keterangan !== "RUSAK").length;
    const rusak = allData.filter((item) => item.tanggal === dateString && item.keterangan === "RUSAK").length;
    return {
      day: `${date.getDate()}`,
      masuk,
      rusak,
    };
  });

  const chartDataPerYear = Array.from({ length: 12 }, (_, i) => {
    const year = new Date().getFullYear();
    const month = (i + 1).toString().padStart(2, "0");
    const masuk = allData.filter((item) =>
      item.tanggal?.startsWith(`${year}-${month}`) && item.keterangan !== "RUSAK"
    ).length;
    const rusak = allData.filter((item) =>
      item.tanggal?.startsWith(`${year}-${month}`) && item.keterangan === "RUSAK"
    ).length;
    return {
      month: new Date(year, i).toLocaleString("default", { month: "short" }),
      masuk,
      rusak,
    };
  });

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write("<style>body{font-family:sans-serif} table{width:100%;border-collapse:collapse} th,td{padding:8px;border:1px solid #000;} th{background:#f2f2f2}</style>");
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h2>Pedurungan</h2>");
    printWindow.document.write(`<p><strong>Jumlah Data:</strong> ${filteredData.length} | <strong>Data Rusak:</strong> ${countRusak}</p>`);
    printWindow.document.write("<table><thead><tr><th>No</th><th>NIK</th><th>Nama</th><th>Keterangan</th><th>Tanggal</th></tr></thead><tbody>");
    filteredData.forEach((item, index) => {
      printWindow.document.write(
        `<tr><td>${index + 1}</td><td>${item.nik}</td><td>${item.nama}</td><td>${item.keterangan}</td><td>${item.tanggal}</td></tr>`
      );
    });
    printWindow.document.write("</tbody></table></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container">
      <div className="header-bar">
        <div>Pedurungan</div>
        <div className="button-group">
          <button className="btn-add" onClick={() => navigate("/add-data/pedurungan")}>Add New</button>
          <button className="btn-print" onClick={handlePrint}>Print</button>
        </div>
      </div>

      {role === "admin" && (
        <>
          <ChartSection dataPerMonth={chartDataPerMonth} dataPerYear={chartDataPerYear} />
          <div className="daily-summary">
            <div className="summary-box box-blue">
              <p>Data Masuk Hari Ini</p>
              <h2>{dataMasukToday}</h2>
            </div>
            <div className="summary-box box-red">
              <p>Data Rusak Hari Ini</p>
              <h2>{rusakToday}</h2>
            </div>
          </div>
        </>
      )}

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by NIK or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
        />
      </div>

      <div className="data-summary">
        <div className="data-box">
          <p>Data Masuk</p>
          <span className="text-blue">{countMasuk}</span>
        </div>
        <div className="data-box">
          <p>Data Rusak</p>
          <span className="text-red">{countRusak}</span>
        </div>
      </div>

      <div className="table-container mt-4">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama</th>
              <th>Keterangan</th>
              <th>Tanggal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nik}</td>
                  <td>{item.nama}</td>
                  <td>
                    <span className={`keterangan-badge ${item.keterangan === "RUSAK" ? "badge-rusak" : ""}`}>
                      {item.keterangan}
                    </span>
                  </td>
                  <td>{item.tanggal}</td>
                  <td>
                    <button className="btn-view" onClick={() => navigate(`/view/pedurungan/${item.id}`)}>View</button>
                    <button className="btn-delete" onClick={() => navigate(`/delete/${item.id}`)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
