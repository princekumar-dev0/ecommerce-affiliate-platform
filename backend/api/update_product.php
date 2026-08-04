<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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
        "message" => "Invalid request data."
    ]);
    exit();
}

$id = intval($data["id"]);

$name = mysqli_real_escape_string($conn, $data["name"]);
$category = mysqli_real_escape_string($conn, $data["category"]);
$description = mysqli_real_escape_string($conn, $data["description"]);
$price = floatval($data["price"]);
$image = mysqli_real_escape_string($conn, $data["image"]);
$affiliate_link = mysqli_real_escape_string($conn, $data["affiliate_link"]);

// New Homepage Flags
$featured = isset($data["featured"]) ? intval($data["featured"]) : 0;
$today_deal = isset($data["today_deal"]) ? intval($data["today_deal"]) : 0;
$flash_sale = isset($data["flash_sale"]) ? intval($data["flash_sale"]) : 0;
$best_seller = isset($data["best_seller"]) ? intval($data["best_seller"]) : 0;

$sql = "
UPDATE products SET
    name='$name',
    category='$category',
    description='$description',
    price='$price',
    image='$image',
    affiliate_link='$affiliate_link',
    featured='$featured',
    today_deal='$today_deal',
    flash_sale='$flash_sale',
    best_seller='$best_seller'
WHERE id='$id'
";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Product updated successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);

}

mysqli_close($conn);

?>