<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

include("../config/db.php");

// Read JSON from React
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received."
    ]);
    exit();
}

$email = trim($data["email"]);
$password = trim($data["password"]);

// Escape email
$email = mysqli_real_escape_string($conn, $email);

// Find user by email only
$sql = "SELECT * FROM users WHERE email='$email'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 1) {

    $user = mysqli_fetch_assoc($result);

    // Verify hashed password
    if (password_verify($password, $user["password"])) {

        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"],
                "role" => $user["role"]
            ]
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Invalid password."
        ]);

    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "Email not found."
    ]);

}

mysqli_close($conn);

?>