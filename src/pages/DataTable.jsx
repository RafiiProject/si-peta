import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/backend/backtengah/get_data.php")
      .then((response) => {
        console.log("Response Data:", response.data); // Debugging
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Data Table</h2>
      {data.length === 0 ? <p>Tidak ada data</p> : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.nama}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataTable;
