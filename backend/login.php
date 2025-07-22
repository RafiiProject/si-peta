<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "database.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['email']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email dan password wajib diisi"]);
    exit;
}

$email = trim($input['email']);
$password = trim($input['password']);

$stmt = $conn->prepare("SELECT id, email, password, role FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success",
            "message" => "Login berhasil",
            "user" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
        exit;
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Password salah"]);
        exit;
    }
} else {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "User tidak ditemukan"]);
    exit;
}
