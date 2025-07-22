import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import ChartSection from "../components/chart/ChartSection";
import "./Dashboard.css";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";

const DashboardUser = () => {
  const role = localStorage.getItem("role");
  const [chartDataPerMonth, setChartDataPerMonth] = useState([]);
  const [chartDataPerYear, setChartDataPerYear] = useState([]);
  const [dataMasukToday, setDataMasukToday] = useState(0);
  const [rusakToday, setRusakToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/sipeta-ktp/backend/back${role}/get_data.php`
        );

        const data = response.data;
        const todayStr = new Date().toISOString().slice(0, 10);

        const masukToday = data.filter(
          (item) => item.tanggal === todayStr && item.keterangan !== "RUSAK"
        ).length;
        const rusakToday = data.filter(
          (item) => item.tanggal === todayStr && item.keterangan === "RUSAK"
        ).length;

        setDataMasukToday(masukToday);
        setRusakToday(rusakToday);

        const monthData = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          const dateString = date.toISOString().slice(0, 10);
          const masuk = data.filter(
            (item) =>
              item.tanggal === dateString && item.keterangan !== "RUSAK"
          ).length;
          const rusak = data.filter(
            (item) =>
              item.tanggal === dateString && item.keterangan === "RUSAK"
          ).length;
          return {
            day: `${date.getDate()}`,
            masuk,
            rusak,
          };
        });

        const year = new Date().getFullYear();
        const yearData = Array.from({ length: 12 }, (_, i) => {
          const month = (i + 1).toString().padStart(2, "0");
          const masuk = data.filter(
            (item) =>
              item.tanggal?.startsWith(`${year}-${month}`) &&
              item.keterangan !== "RUSAK"
          ).length;
          const rusak = data.filter(
            (item) =>
              item.tanggal?.startsWith(`${year}-${month}`) &&
              item.keterangan === "RUSAK"
          ).length;
          return {
            month: new Date(year, i).toLocaleString("default", {
              month: "short",
            }),
            masuk,
            rusak,
          };
        });

        setChartDataPerMonth(monthData);
        setChartDataPerYear(yearData);
      } catch (error) {
        console.error("Gagal mengambil data grafik:", error);
      }
    };

    if (role) fetchData();
  }, [role]);

  const createDonutData = (value) => {
    return value === 0
      ? [{ name: "Kosong", value: 1 }]
      : [
          { name: "Data", value },
          { name: "Sisa", value: Math.max(0, 10 - value) },
        ];
  };

  const masukData = createDonutData(dataMasukToday);
  const rusakData = createDonutData(rusakToday);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Dashboard {role?.toUpperCase()}</div>

        <ChartSection
          dataPerMonth={chartDataPerMonth}
          dataPerYear={chartDataPerYear}
        />

        <div className="donut-section">
          {/* Data Masuk Hari Ini */}
          <div className="chart-box">
            <h3 style={{ textAlign: "center" }}>Data Masuk Hari Ini</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={masukData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill="#007bff" />
                  <Cell fill="#e0e0e0" />
                  <Label
                    value={dataMasukToday}
                    position="center"
                    fontSize={80}
                    fontWeight="bold"
                    fill="#333"
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Data Rusak Hari Ini */}
          <div className="chart-box">
            <h3 style={{ textAlign: "center" }}>Data Rusak Hari Ini</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rusakData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill="#ff4d4d" />
                  <Cell fill="#e0e0e0" />
                  <Label
                    value={rusakToday}
                    position="center"
                    fontSize={80}
                    fontWeight="bold"
                    fill="#333"
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
