<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");

include("../config/db.php");


$data = json_decode(file_get_contents("php://input"), true);


$user_name = $data["user_name"];
$user_email = $data["user_email"];
$phone = $data["phone"];
$address = $data["address"];
$total_amount = $data["total_amount"];

$items = $data["items"];


// Insert Order

$orderQuery = "
INSERT INTO orders
(user_name,user_email,phone,address,total_amount)

VALUES
(
'$user_name',
'$user_email',
'$phone',
'$address',
'$total_amount'
)
";


if(mysqli_query($conn,$orderQuery)){


    $order_id = mysqli_insert_id($conn);


    foreach($items as $item){


        $product_id = $item["id"];
        $product_name = $item["name"];
        $quantity = $item["quantity"];
        $price = $item["price"];


        $itemQuery="
        INSERT INTO order_items
        (order_id,product_id,product_name,quantity,price)

        VALUES

        (
        '$order_id',
        '$product_id',
        '$product_name',
        '$quantity',
        '$price'
        )
        ";


        mysqli_query($conn,$itemQuery);

    }


    echo json_encode([

        "success"=>true,
        "message"=>"Order placed successfully",
        "order_id"=>$order_id

    ]);


}

else{


    echo json_encode([

        "success"=>false,
        "message"=>"Order failed"

    ]);

}


mysqli_close($conn);

?>