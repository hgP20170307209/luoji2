<?php
header("Content-type:text/html;charset=utf8");

$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];

/* 用户登录的时候逻辑： */
/* 先检查该用户是否存在，如果不存在那么应该返回错误提示:该用户名不存在 */
/* 如果用户存在，那么应该继续检查密码，如果密码不正确，应该返回错误提示：密码不正确 */
/* 如果密码正确，应该返回正确的提示：登录成功！！！ */
include_once "./connectDB.php";

$sql = "SELECT * FROM `user` WHERE phone = '$phone'";
$r = mysqli_query($db, $sql);


$data = array("status"=>"","data"=>array("msg"=>""));
if(mysqli_num_rows($r) == 0)
{
  # (2-1) 如果不存在，那么就返回数据(登录失败，用户名不存在)
  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
  # (2-2) 如果用户名存在，接着检查密码
  $sql2 = "SELECT * FROM user WHERE phone='$phone'";
  $r = mysqli_query($db,$sql2);
  $res = mysqli_fetch_all($r, MYSQLI_ASSOC)[0];
  $pwd = $res["password"];
  if($password !=  $pwd)
  {
    # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，密码不正确！！！";
  }else
  {
    # (2-2-2) 密码正确，那么就返回数据(登录成功)
    $userId = $res["user_id"];
    $data["status"] = "success";
    $data["data"]["msg"] = "恭喜你，登录成功";
    $data["data"]["userId"] = $userId;
    $data["data"]["password"] = $password;
    $data["data"]["phone"] = $phone;
  }
}
echo json_encode($data,true);


// $num = mysqli_num_rows($r); /* 该方法得到的是记录的条数:$r["num_rows"]  */

// if($num == 1){
//   $data = mysqli_fetch_all($r,MYSQLI_ASSOC)[0];
//   if($password  === $data["password"]){
//     echo '{"status":"success","msg":"登录成功!"}';
    
//     // echo '{"phone":"$phone"}';
//   }else{
//     echo '{"status":"error","msg":"密码不正确!"}';
//   }
// }else{
//   echo '{"status":"error","msg":"该用户名不存在!"}';
// }

// echo json_encode($data,true);


?>