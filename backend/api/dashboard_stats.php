<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

// Total Orders
$totalOrders = 0;
$result = mysqli_query($conn, "SELECT COUNT(*) AS total FROM orders");

if ($row = mysqli_fetch_assoc($result)) {
    $totalOrders = $row['total'];
}

// Total Revenue
$totalRevenue = 0;
$result = mysqli_query($conn, "SELECT SUM(total_amount) AS revenue FROM orders");

if ($row = mysqli_fetch_assoc($result)) {
    $totalRevenue = $row['revenue'] ? $row['revenue'] : 0;
}

// Total Customers
$totalCustomers = 0;
$result = mysqli_query($conn, "SELECT COUNT(*) AS total FROM users");

if ($row = mysqli_fetch_assoc($result)) {
    $totalCustomers = $row['total'];
}

// Pending Orders
$pendingOrders = 0;
$result = mysqli_query(
    $conn,
    "SELECT COUNT(*) AS total FROM orders WHERE status='Pending'"
);

if ($row = mysqli_fetch_assoc($result)) {
    $pendingOrders = $row['total'];
}

// Recent Orders
$recentOrders = [];

$query = "
SELECT
    id,
    user_name,
    user_email,
    total_amount,
    status,
    order_date
FROM orders
ORDER BY id DESC
LIMIT 5
";

$result = mysqli_query($conn, $query);

while ($row = mysqli_fetch_assoc($result)) {
    $recentOrders[] = $row;
}

// Final Response
echo json_encode([
    "totalOrders" => $totalOrders,
    "totalRevenue" => $totalRevenue,
    "totalCustomers" => $totalCustomers,
    "pendingOrders" => $pendingOrders,
    "recentOrders" => $recentOrders
]);

?>