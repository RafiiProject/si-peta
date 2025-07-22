<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$uploadDir = "../uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!isset($_FILES["file"])) {
    echo json_encode(["status" => "error", "message" => "Tidak ada file yang diunggah!"]);
    exit;
}

$file = $_FILES["file"];
$filename = uniqid() . "_" . basename($file["name"]);
$targetPath = $uploadDir . $filename;

// Pastikan hanya file PDF yang diperbolehkan
$fileType = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
if ($fileType !== "pdf") {
    echo json_encode(["status" => "error", "message" => "Hanya file PDF yang diperbolehkan!"]);
    exit;
}

if (move_uploaded_file($file["tmp_name"], $targetPath)) {
    echo json_encode(["status" => "success", "fileUrl" => "http://localhost/sipeta-ktp/uploads/" . $filename]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal mengunggah file"]);
}
?>
