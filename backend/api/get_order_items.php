<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include("../config/db.php");

if (!isset($_GET["order_id"])) {
    echo json_encode([]);
    exit;
}

$order_id = intval($_GET["order_id"]);

$sql = "SELECT * FROM order_items WHERE order_id = $order_id";

$result = mysqli_query($conn, $sql);

$items = [];

while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}

echo json_encode($items);

mysqli_close($conn);

?>