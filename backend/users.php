<?php
// Tangani preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");
    http_response_code(200);
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

require_once "database.php";



// GET specific user by ID
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT id, email, role FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($user = $result->fetch_assoc()) {
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User tidak ditemukan"]);
    }
    exit;
}

// GET all users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, email, role FROM users ORDER BY id ASC";
    $result = $conn->query($sql);

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
    exit;
}

// POST: Tambah user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['email']) || !isset($input['password']) || !isset($input['role'])) {
        http_response_code(400);
        echo json_encode(["message" => "Email, password, dan role wajib diisi"]);
        exit;
    }

    $email = trim($input['email']);
    $password = password_hash(trim($input['password']), PASSWORD_BCRYPT);
    $role = trim($input['role']);

    $stmt = $conn->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $password, $role);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User berhasil ditambahkan"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Gagal menambahkan user"]);
    }
    $stmt->close();
    exit;
}

// PUT: Edit user
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['id']) || !isset($input['email']) || !isset($input['role'])) {
        http_response_code(400);
        echo json_encode(["message" => "ID, email, dan role wajib diisi"]);
        exit;
    }

    $id = intval($input['id']);
    $email = trim($input['email']);
    $role = trim($input['role']);

    if (!empty($input['password'])) {
        $password = password_hash($input['password'], PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE users SET email = ?, role = ?, password = ? WHERE id = ?");
        $stmt->bind_param("sssi", $email, $role, $password, $id);
    } else {
        $stmt = $conn->prepare("UPDATE users SET email = ?, role = ? WHERE id = ?");
        $stmt->bind_param("ssi", $email, $role, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(["message" => "User berhasil diperbarui"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Gagal memperbarui user"]);
    }
    $stmt->close();
    exit;
}

// DELETE user
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Parameter ID diperlukan"]);
        exit;
    }

    $id = intval($_GET['id']);
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User berhasil dihapus"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Gagal menghapus user"]);
    }
    $stmt->close();
    exit;
}

// Jika tidak sesuai method
http_response_code(405);
echo json_encode(["message" => "Metode tidak diizinkan"]);
