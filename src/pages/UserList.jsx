import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost/sipeta-ktp/backend/users.php");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`http://localhost/sipeta-ktp/backend/users.php?id=${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Gagal menghapus user:", err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="section-title">Daftar Pengguna</div>

        <div className="user-search-box">
          <input
            type="text"
            placeholder="🔍 Cari email atau role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="userlist-btn userlist-reset-btn"
            onClick={() => setSearch("")}
          >
            Reset
          </button>
          <button
            className="userlist-btn userlist-add-btn"
            onClick={() => navigate("/register")}
          >
            Tambah Pengguna
          </button>
        </div>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="userlist-edit-btn"
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="userlist-delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4">Tidak ada data ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
