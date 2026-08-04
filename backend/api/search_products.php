<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include("../config/db.php");

$search = "";

if(isset($_GET["search"])){
    $search = mysqli_real_escape_string($conn, $_GET["search"]);
}

$sql = "SELECT * FROM products
WHERE
name LIKE '%$search%'
OR
category LIKE '%$search%'
OR
description LIKE '%$search%'
ORDER BY id DESC";

$result = mysqli_query($conn,$sql);

$products=[];

while($row=mysqli_fetch_assoc($result)){
    $products[]=$row;
}

echo json_encode($products);

mysqli_close($conn);

?>