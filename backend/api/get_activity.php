<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$result = mysqli_query(
    $conn,
    "SELECT * FROM activity_logs ORDER BY id DESC LIMIT 50"
);

$logs = [];

while ($row = mysqli_fetch_assoc($result)) {
    $logs[] = $row;
}

echo json_encode($logs);
?>