<?php 

header("Content-type:text/html;charset=utf8");

// 连接数据库
include_once "./connectDB.php";

$sort = $_REQUEST["sort"];
$page = $_REQUEST["page"];

$limit = $page * 16;

if($sort == "default"){
    $sql = "SELECT * FROM goods Order BY good_id LIMIT $limit,16";
}elseif($sort == "price_asc"){
    $sql = "SELECT * FROM goods Order BY price ASC LIMIT $limit,16";
} elseif ($sort == "price_desc"){
    $sql = "SELECT * FROM goods Order BY price DESC LIMIT $limit,16" ;
}


$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);


?>