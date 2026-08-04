<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received."
    ]);
    exit();
}

if (
    !isset($data["user_email"]) ||
    !isset($data["product_id"])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit();
}

$user_email = mysqli_real_escape_string($conn, $data["user_email"]);
$product_id = intval($data["product_id"]);

$check = mysqli_query(
    $conn,
    "SELECT id FROM wishlist
     WHERE user_email='$user_email'
     AND product_id='$product_id'"
);

if (mysqli_num_rows($check) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Product already exists in wishlist."
    ]);
    exit();
}

$sql = "INSERT INTO wishlist
(user_email, product_id)
VALUES
('$user_email','$product_id')";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Added to wishlist."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);

}

mysqli_close($conn);

?>