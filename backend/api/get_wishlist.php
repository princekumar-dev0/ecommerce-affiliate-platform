<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include("../config/db.php");

$user_email = mysqli_real_escape_string(
    $conn,
    $_GET["user_email"]
);

$sql = "SELECT products.*
FROM wishlist
INNER JOIN products
ON wishlist.product_id = products.id
WHERE wishlist.user_email='$user_email'
ORDER BY wishlist.created_at DESC";

$result = mysqli_query($conn, $sql);

$products = [];

while($row = mysqli_fetch_assoc($result)){
    $products[] = $row;
}

echo json_encode($products);

mysqli_close($conn);

?>