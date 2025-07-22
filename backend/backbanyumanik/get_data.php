<?php
// Set header untuk mengizinkan CORS (agar React bisa mengakses API ini)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Koneksi ke database
$host = "localhost";
$user = "root"; // Ganti sesuai database kamu
$pass = "";
$db   = "sipeta_ktp";

$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

// Ambil data dari tabel `tengah`
$sql = "SELECT id, nik, nama, keterangan, tanggal, file_name, 
        TO_BASE64(file_data) AS file_data FROM banyumanik";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Format data untuk JSON response
        $data[] = [
            "id" => $row["id"],
            "nik" => $row["nik"],
            "nama" => $row["nama"],
            "keterangan" => $row["keterangan"],
            "tanggal" => $row["tanggal"],
            "file_name" => $row["file_name"],
            "file_data" => $row["file_data"] // Sudah dalam format Base64
        ];
    }
}

// Tutup koneksi
$conn->close();

// Kirim data sebagai JSON
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
