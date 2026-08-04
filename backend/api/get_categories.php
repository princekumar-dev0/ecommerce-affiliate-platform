<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$sql = "
SELECT DISTINCT category
FROM products
WHERE category IS NOT NULL
AND category != ''
ORDER BY category ASC
";

$result = mysqli_query($conn, $sql);

$categories = [];

while ($row = mysqli_fetch_assoc($result)) {
    $categories[] = $row["category"];
}

echo json_encode($categories);

mysqli_close($conn);

?>