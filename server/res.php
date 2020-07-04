<?php
include_once "./connectDB.php";

/* 核心逻辑： */
/* (1) 先拿到用户提交的参数 */
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];

$sql = "SELECT * FROM `user` WHERE phone = '$phone'";

$r = mysqli_query($db, $sql);

$num= mysqli_num_rows($r); /* 该方法得到的是记录的条数:$r["num_rows"]  */

/* + 检查：检查当前的用户名在数据库中是否已经存在，如果存在那么就应该提示，否则就插入 */ 
if($num == 1){
  echo '{"status":"error","msg":"该号码已经存在，请重新填写注册的号码!!"}';
  
}else{
  $sql = "INSERT INTO user " .
    "(user_id,password,user_date,phone)" .
    "VALUES " .
    "(NULL,'$password','2020-07-01',$phone)";

  $retval = mysqli_query($db, $sql);
  // echo $retval;
  
  if (!$retval) {
    die('无法插入数据: ' . mysqli_error($conn));
  }

  /* 注意：PHP代码中不能使用``符号 */
  echo '{"status":"success"}';
}

?>