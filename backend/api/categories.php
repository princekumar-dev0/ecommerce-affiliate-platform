<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include("../config/db.php");

$sql = "SELECT DISTINCT category FROM products ORDER BY category ASC";

$result = mysqli_query($conn, $sql);

$categories = [];

while ($row = mysqli_fetch_assoc($result)) {
    $categories[] = $row["category"];
}

echo json_encode($categories);

mysqli_close($conn);

?>