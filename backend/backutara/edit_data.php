<?php
require 'database.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['nik'], $data['nama'], $data['keterangan'], $data['tanggal'])) {
    $stmt = $conn->prepare("UPDATE data_ktp SET nik=?, nama=?, keterangan=?, tanggal=? WHERE id=?");
    $stmt->bind_param("ssssi", $data['nik'], $data['nama'], $data['keterangan'], $data['tanggal'], $data['id']);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => "Data berhasil diperbarui"]);
    } else {
        echo json_encode(["error" => "Gagal memperbarui data"]);
    }
} else {
    echo json_encode(["error" => "Data tidak lengkap"]);
}
?>
