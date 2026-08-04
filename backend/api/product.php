<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "Product ID is required"]);
    exit;
}

$id = intval($_GET['id']);

$sql = "SELECT * FROM products WHERE id = $id";

$result = mysqli_query($conn, $sql);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Product not found"]);
}

mysqli_close($conn);

?>