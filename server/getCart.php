<?php 

header("Content-type:text/html;charset=utf8");

//1.连接数据库
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];

/* 多表查询 */
$sql = "SELECT cart.*,goods.title,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id=$user_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);


?>