<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

include("../config/db.php");

// Read JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Check if data was received
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received."
    ]);
    exit();
}

// Validate required fields
if (
    !isset($data["name"]) ||
    !isset($data["email"]) ||
    !isset($data["password"])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit();
}

$name = trim($data["name"]);
$email = trim($data["email"]);
$password = trim($data["password"]);

// Check for empty values
if ($name == "" || $email == "" || $password == "") {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit();
}

// Escape data
$name = mysqli_real_escape_string($conn, $name);
$email = mysqli_real_escape_string($conn, $email);

// Hash password
$password = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$check = mysqli_query(
    $conn,
    "SELECT id FROM users WHERE email='$email'"
);

if (mysqli_num_rows($check) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email already exists."
    ]);
    exit();
}

// Insert user
$query = "
INSERT INTO users(name,email,password)
VALUES('$name','$email','$password')
";

if (mysqli_query($conn, $query)) {

    echo json_encode([
        "success" => true,
        "message" => "Registration successful."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);

}

mysqli_close($conn);

?>