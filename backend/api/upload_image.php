<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    exit(0);
}

$targetDir = "../uploads/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (!isset($_FILES["image"])) {
    echo json_encode([
        "success" => false,
        "message" => "No image selected."
    ]);
    exit;
}

$image = $_FILES["image"];

$allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
];

if (!in_array($image["type"], $allowedTypes)) {
    echo json_encode([
        "success" => false,
        "message" => "Only JPG, PNG and WEBP images are allowed."
    ]);
    exit;
}

$fileExtension = pathinfo($image["name"], PATHINFO_EXTENSION);

$fileName = time() . "_" . uniqid() . "." . $fileExtension;

$targetFile = $targetDir . $fileName;

if (move_uploaded_file($image["tmp_name"], $targetFile)) {

    echo json_encode([
        "success" => true,
        "image" => "http://localhost/AFFILIATE/backend/uploads/" . $fileName
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Image upload failed."
    ]);

}

?>