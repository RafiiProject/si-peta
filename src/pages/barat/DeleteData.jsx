import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteData = async () => {
      try {
        const response = await fetch("http://localhost/sipeta-ktp/backend/backbarat/delete_data.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
        });

        const result = await response.json();

        if (result.status === "success") {
          alert(result.message);
        } else {
          alert("Gagal menghapus data: " + result.message);
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus data.");
        console.error("Error:", error);
      } finally {
        navigate("/barat"); // Arahkan kembali ke halaman utama
      }
    };

    if (id) deleteData();
  }, [id, navigate]);

  return (
    <div className="container mt-5 text-center">
      <p>Menghapus data...</p>
    </div>
  );
};

export default DeleteData;
