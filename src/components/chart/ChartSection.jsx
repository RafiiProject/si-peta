import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./ChartSection.css";

const ChartSection = ({ dataPerMonth, dataPerYear }) => {
  return (
    <div className="chart-section">
      <div className="chart-box">
        <h4>Data Keseluruhan dan Rusak (Last Month)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataPerMonth} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="masuk" stroke="#00CFFF" name="Data Masuk" />
            <Line type="monotone" dataKey="rusak" stroke="#FF5E78" name="Data Rusak" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h4>Data Keseluruhan dan Rusak (Last Year)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataPerYear} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="masuk" stroke="#00CFFF" name="Data Masuk" />
            <Line type="monotone" dataKey="rusak" stroke="#FF5E78" name="Data Rusak" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
