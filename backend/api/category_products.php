<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include("../config/db.php");

$category = "";

if (isset($_GET["category"])) {
    $category = mysqli_real_escape_string($conn, $_GET["category"]);
}

$sql = "SELECT * FROM products WHERE category='$category' ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

$products = [];

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);

mysqli_close($conn);

?>