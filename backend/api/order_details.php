<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$id = $_GET["id"];

$query = "
SELECT *
FROM orders
WHERE id='$id'
LIMIT 1
";

$result = mysqli_query($conn, $query);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(null);
}
?>