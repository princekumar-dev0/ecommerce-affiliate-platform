<?php

include("../config/db.php");

header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=orders.xls");

echo "ID\tCustomer\tEmail\tAmount\tStatus\tDate\n";

$query = "SELECT * FROM orders ORDER BY id DESC";

$result = mysqli_query($conn, $query);

while($row = mysqli_fetch_assoc($result)){

    echo
        $row["id"]."\t".
        $row["user_name"]."\t".
        $row["user_email"]."\t".
        $row["total_amount"]."\t".
        $row["status"]."\t".
        $row["order_date"]."\n";
}

?>