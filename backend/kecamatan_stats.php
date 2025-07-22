<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once "database.php";

$kecamatanList = [
  "dinas", "tengah", "barat", "timur", "utara",
  "selatan", "tembalang", "banyumanik", "gajahmungkur",
  "candisari", "genuk", "gunungpati", "mijen",
  "ngaliyan", "pedurungan", "tugu"
];

$res = [];
foreach ($kecamatanList as $key) {
    $q = $conn->query("
      SELECT 
        COUNT(*) AS total,
        SUM(keterangan = 'rusak') AS rusak
      FROM `$key`
    ");
    if ($q) {
      $d = $q->fetch_assoc();
      $label = $key === "dinas"
        ? "DUKCAPIL DINAS"
        : "TPDK " . (in_array($key, ["tengah","barat","timur","utara","selatan"]) 
                     ? "SEMARANG " . strtoupper($key) 
                     : strtoupper($key));
      $res[] = [
        "name" => $key,
        "label" => $label,
        "total" => (int)$d["total"],
        "rusak" => (int)$d["rusak"],
        "path" => "/" . $key
      ];
    }
}

echo json_encode($res);
