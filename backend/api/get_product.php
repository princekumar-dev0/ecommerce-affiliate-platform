<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include("../config/db.php");

if (!isset($_GET["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Product ID is required."
    ]);
    exit;
}

$id = intval($_GET["id"]);

$sql = "SELECT * FROM products WHERE id='$id'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $product = mysqli_fetch_assoc($result);

    echo json_encode($product);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Product not found."
    ]);

}

mysqli_close($conn);

?>