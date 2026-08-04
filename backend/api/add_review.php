<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$product_id = $data["product_id"];
$user_name = $data["user_name"];
$rating = $data["rating"];
$review = $data["review"];

$query = "
INSERT INTO reviews(product_id,user_name,rating,review)
VALUES('$product_id','$user_name','$rating','$review')
";

if(mysqli_query($conn,$query)){
    echo json_encode([
        "success"=>true,
        "message"=>"Review submitted successfully."
    ]);
}else{
    echo json_encode([
        "success"=>false,
        "message"=>mysqli_error($conn)
    ]);
}
?>