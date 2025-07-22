<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}

// Koneksi ke DB
require_once "../database.php";

// Ambil data
$nik        = $_POST['nik'] ?? '';
$nama       = $_POST['nama'] ?? '';
$keterangan = $_POST['keterangan'] ?? '';
$tanggal    = $_POST['tanggal'] ?? '';
$file_name  = '';
$file_data  = '';

// Validasi
if ($keterangan !== 'RUSAK' && (empty($nik) || strlen($nik) !== 16 || empty($nama))) {
    echo json_encode([
        "status" => "error",
        "message" => "NIK harus 16 digit dan Nama tidak boleh kosong."
    ]);
    exit;
}

// Proses file
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file_name = $_FILES['file']['name'];
    $file_data = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
}

// Simpan
$query = "INSERT INTO ngaliyan (nik, nama, keterangan, tanggal, file_name, file_data) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param("ssssss", $nik, $nama, $keterangan, $tanggal, $file_name, $file_data);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data berhasil disimpan."]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal menyimpan data: " . $stmt->error]);
}

$stmt->close();
$conn->close();
