// ... import dan useState sama seperti sebelumnya ...
import React, { useEffect, useState } from "react";
import "./DashboardCharts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";

const DashboardCharts = () => {
  const [barData, setBarData] = useState([
    { name: "Last Year", masuk: 0, rusak: 0 },
  ]);
  const [barDataLastMonthByKecamatan, setBarDataLastMonthByKecamatan] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [pieDataMasuk, setPieDataMasuk] = useState([]);
  const [pieDataRusak, setPieDataRusak] = useState([]);

  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#FF6666", "#AA00FF", "#00B0FF", "#FF4081",
    "#4CAF50", "#9C27B0", "#795548", "#3F51B5",
    "#FF5722", "#607D8B", "#E91E63", "#CDDC39"
  ];

  const renderCenterLabel = (text, color = "#333", fontSize = 100) => ({ cx, cy }) => (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={fontSize}
      fontWeight="bold"
      fill={color}
    >
      {text}
    </text>
  );

  useEffect(() => {
    axios.get("http://localhost/sipeta-ktp/backend/chart.php")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        const today = dayjs();
        const startOfYear = today.startOf("year");
        const startOfMonth = today.startOf("month");
        const startOfWeek = today.subtract(6, "day");

        const validData = data.filter(d => dayjs(d.tanggal).isValid());

        // === List kecamatan
        const kecamatanList = [
          "banyumanik", "barat", "candisari", "dinas", "gajahmungkur", "genuk", "gunungpati",
          "mijen", "ngaliyan", "pedurungan", "selatan", "tembalang", "tengah", "timur", "tugu", "utara"
        ];

        const initPieMap = {};
        kecamatanList.forEach(kec => {
          initPieMap[kec] = { name: kec, masuk: 0, rusak: 0 };
        });

        validData.forEach(d => {
          const kec = d.table;
          if (kecamatanList.includes(kec)) {
            if (d.keterangan === "rusak") {
              initPieMap[kec].rusak += 1;
            } else {
              initPieMap[kec].masuk += 1;
            }
          }
        });

        setPieDataMasuk(Object.values(initPieMap).map(d => ({ name: d.name, value: d.masuk })));
        setPieDataRusak(Object.values(initPieMap).map(d => ({ name: d.name, value: d.rusak })));

        // === Last Year
        const lastYear = validData.filter(d => dayjs(d.tanggal).isBefore(startOfYear));
        setBarData([
          {
            name: "Last Year",
            masuk: lastYear.length,
            rusak: lastYear.filter(d => d.keterangan === "rusak").length,
          },
        ]);

        // === Last Month per kecamatan
        const lastMonth = validData.filter(d => dayjs(d.tanggal).isSame(startOfMonth, "month"));
        const monthMap = {};
        kecamatanList.forEach(kec => {
          monthMap[kec] = { name: kec, masuk: 0, rusak: 0 };
        });
        lastMonth.forEach(d => {
          const kec = d.table;
          if (kecamatanList.includes(kec)) {
            if (d.keterangan === "rusak") {
              monthMap[kec].rusak += 1;
            } else {
              monthMap[kec].masuk += 1;
            }
          }
        });
        setBarDataLastMonthByKecamatan(Object.values(monthMap));

        // === Last Week
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
          const date = startOfWeek.add(i, "day");
          const formatted = date.format("YYYY-MM-DD");
          const label = date.format("ddd");

          const dailyMasuk = validData.filter(d => dayjs(d.tanggal).format("YYYY-MM-DD") === formatted && d.keterangan !== "rusak").length;
          const dailyRusak = validData.filter(d => dayjs(d.tanggal).format("YYYY-MM-DD") === formatted && d.keterangan === "rusak").length;

          weekDays.push({
            name: label,
            masuk: dailyMasuk,
            rusak: dailyRusak,
          });
        }
        setWeekData(weekDays);
      })
      .catch(err => {
        console.error("Failed to fetch data", err);
      });
  }, []);

  const totalMasuk = pieDataMasuk.reduce((acc, cur) => acc + cur.value, 0);
  const totalRusak = pieDataRusak.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="chart-wrapper">
      <div className="top-row">
        {barData.map((item, index) => (
          <div className="chart-card" key={index}>
            <h3 className="chart-title">Total {item.name}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[item]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="masuk" fill="#A0D7E7" name="Data Masuk" />
                <Bar dataKey="rusak" fill="#F8BBD0" name="Data Rusak" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}

        {/* 🔽 Last Month dengan SCROLL */}
        <div className="chart-card">
          <h3 className="chart-title">Total Last Month (per kecamatan)</h3>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "1200px", height: "220px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barDataLastMonthByKecamatan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="masuk" fill="#A0D7E7" name="Data Masuk" />
                  <Bar dataKey="rusak" fill="#F8BBD0" name="Data Rusak" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-row">
        <div className="chart-card chart-large">
          <h3 className="chart-title">Total Last Week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="masuk" fill="#A0D7E7" name="Data Masuk" />
              <Bar dataKey="rusak" fill="#F8BBD0" name="Data Rusak" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card chart-pie">
          <h3 className="chart-title">Total Data Masuk</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieDataMasuk}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={45}
                labelLine={false}
                label={renderCenterLabel(totalMasuk, "#007bff", 100)}
              >
                {pieDataMasuk.map((entry, index) => (
                  <Cell key={`cell-masuk-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card chart-pie">
          <h3 className="chart-title">Total Data Rusak Masuk</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieDataRusak}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={45}
                labelLine={false}
                label={renderCenterLabel(totalRusak, "#dc3545", 100)}
              >
                {pieDataRusak.map((entry, index) => (
                  <Cell key={`cell-rusak-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
