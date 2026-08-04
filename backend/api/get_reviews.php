<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$product_id = $_GET["product_id"];

$query = "
SELECT *
FROM reviews
WHERE product_id='$product_id'
ORDER BY created_at DESC
";

$result = mysqli_query($conn,$query);

$reviews=[];

while($row=mysqli_fetch_assoc($result)){
    $reviews[]=$row;
}

echo json_encode($reviews);
?>