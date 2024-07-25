<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include("partial/conn.php");
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
      
        include("partial/db.php");
        $fire = new db();
        $result = $fire->performcurd("admin_auth", 's', [], []);
        if (!empty($result)) {
            
            echo json_encode(["result" => $result]);
            
            return;
         
        } else {
            echo json_encode(["not" => "No data found"]);
        }
        break;

    case "POST":
        include("partial/db.php");
        $userpostdata = json_decode(file_get_contents("php://input"), true);
        
       echo  $name = $userpostdata['name']; 
      echo  $eno = $userpostdata['eno']; 
       echo  $uni_name = $userpostdata['uni_name']; 
       echo  $uni_loc = $userpostdata['uni_loc']; 
       echo  $st_date=$userpostdata['st_date']; 
    
        $detail=array(
            'name'=>$name,
           'enroll_no'=>$eno,
           'university_name'=>$uni_name,
           'location'=>$uni_loc,
           'date'=>$st_date
        );
        $fire = new db();
        $result = $fire->performcurd("student", 'i', $detail, []);
        if ($result) {
            echo json_encode(["suc" => "data Added Successfully"]);
        } else {
            echo json_encode(["error" => "Please Check the User Data!"]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}




?>



