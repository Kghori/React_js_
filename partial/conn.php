<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
    $servername="localhost";
    $username="root";
    $password="";
    $databasename="webs_tech";
    global $conn;
    try{
        $conn = new PDO("mysql:host=$servername;dbname=$databasename", $username, $password);
        // echo "<h1 style='color:green'>Connection successfully established</h1>";
    }catch(PDOException $e){
        echo "<h1>Connection failed</h1>" . $e->getMessage();
    }

?>