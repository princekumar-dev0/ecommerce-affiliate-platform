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

// Read JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received."
    ]);
    exit();
}

// Product Details
$name = mysqli_real_escape_string($conn, $data["name"]);
$category = mysqli_real_escape_string($conn, $data["category"]);
$description = mysqli_real_escape_string($conn, $data["description"]);
$price = $data["price"];
$image = mysqli_real_escape_string($conn, $data["image"]);
$affiliate_link = mysqli_real_escape_string($conn, $data["affiliate_link"]);

// New Fields
$featured = isset($data["featured"]) ? (int)$data["featured"] : 0;
$today_deal = isset($data["today_deal"]) ? (int)$data["today_deal"] : 0;
$flash_sale = isset($data["flash_sale"]) ? (int)$data["flash_sale"] : 0;
$best_seller = isset($data["best_seller"]) ? (int)$data["best_seller"] : 0;

// Insert Product
$sql = "
INSERT INTO products
(
    name,
    category,
    description,
    price,
    image,
    affiliate_link,
    featured,
    today_deal,
    flash_sale,
    best_seller
)
VALUES
(
    '$name',
    '$category',
    '$description',
    '$price',
    '$image',
    '$affiliate_link',
    '$featured',
    '$today_deal',
    '$flash_sale',
    '$best_seller'
)
";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Product added successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);

}

mysqli_close($conn);

?>