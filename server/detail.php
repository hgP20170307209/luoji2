<?php 

header("Content-type:text/html;charset=utf8");

// 连接数据库
include_once "./connectDB.php";

$good_id = $_REQUEST["good_id"];

$sql = "SELECT * FROM user WHERE good_id= $good_id";


$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);


?>