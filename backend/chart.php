<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli("localhost", "root", "", "sipeta_ktp");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$tables = [
    "banyumanik", "barat", "candisari", "dinas", "gajahmungkur", "genuk", "gunungpati",
    "mijen", "ngaliyan", "pedurungan", "selatan", "tembalang", "tengah", "timur", "tugu", "utara"
];

$allData = [];

foreach ($tables as $table) {
    $sql = "SELECT nik, keterangan, tanggal FROM $table";
    $result = $conn->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $allData[] = [
                "nik" => $row["nik"],
                "keterangan" => strtolower($row["keterangan"]),
                "tanggal" => $row["tanggal"],
                "table" => $table
            ];
        }
    }
}

echo json_encode($allData);
$conn->close();
?>
