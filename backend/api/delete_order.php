<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Order ID is required."
    ]);
    exit;
}

$order_id = intval($data["id"]);

// Delete all items belonging to this order
$itemQuery = "DELETE FROM order_items WHERE order_id = $order_id";
mysqli_query($conn, $itemQuery);

// Delete the order
$orderQuery = "DELETE FROM orders WHERE id = $order_id";

if (mysqli_query($conn, $orderQuery)) {

    echo json_encode([
        "success" => true,
        "message" => "Order deleted successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete order."
    ]);

}

mysqli_close($conn);

?>