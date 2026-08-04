<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$query = "
SELECT
    id,
    name,
    category,
    price
FROM products
ORDER BY name ASC
";

$result = mysqli_query($conn, $query);

$products = [];

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>