<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include("../config/db.php");

$sql = "
SELECT
    id,
    user_name,
    user_email,
    phone,
    address,
    total_amount,
    status,
    order_date
FROM orders
ORDER BY id DESC
";

$result = mysqli_query($conn, $sql);

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

echo json_encode($orders);

mysqli_close($conn);

?>