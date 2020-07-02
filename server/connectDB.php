<?php
header("Content-type:text/html;charset=utf8");

$db = mysqli_connect("127.0.0.1", "root", "root", "luoji");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}
?>