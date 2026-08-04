<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$sql = "
SELECT *
FROM products
WHERE best_seller = 1
ORDER BY id DESC
";

$result = mysqli_query($conn, $sql);

$products = [];

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);

mysqli_close($conn);

?>