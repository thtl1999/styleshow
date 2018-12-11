<?php
 $host = 'localhost';
 $user = 'root';
 $pw = 'soft14#Skku';
 $dbName = 'ss_db';
 $mysqli = new mysqli($host, $user, $pw, $dbName);
 
 $id=$_POST['id'];
 $password=$_POST['pwd'];
 
 $sql = "insert into likeid (id, pwd)";
 $sql = $sql. "values('$id','$password')";
 if($mysqli->query($sql)){
  echo 'success inserting';
 }else{
  echo 'fail to insert sql';
 }
?>