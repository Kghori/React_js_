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
        $result = $fire->performcurd("st_data", 's', [], []);
        if (!empty($result)) {
            // echo "<a href='fetch.php'> fetch</a>";
            echo json_encode(["result" => $result]);
            
            return;
         
        } else {
            echo json_encode(["not" => "No data found"]);
        }
        break;

    case "POST":
        include("partial/db.php");
        $userpostdata = json_decode(file_get_contents("php://input"), true);
        // pname:fvalue.project_name,
        // sno:fvalue.semester_no,
        // degree:fvalue.degree,
        // course:fvalue.course,
        // uname:fvalue.university_name,
        // uloc:fvalue.university_location,
        // stname:fvalue.stname,
        // guiname:fvalue.guidance_name,
        // stdate:fvalue.internship_start_date,
        // eddate:fvalue.internship_end_date
       echo  $pname = $userpostdata['pname']; 
      echo  $sno = $userpostdata['sno']; 
       echo  $degree = $userpostdata['degree']; 
       echo  $course = $userpostdata['course']; 
       echo  $uname=$userpostdata['uname']; 
       echo  $uloc=$userpostdata['uloc'];
       echo   $stname=$userpostdata['stname'];
       echo  $guiname=$userpostdata['stdate'];
       echo   $stdate=$userpostdata['uname'];
       echo  $eddate=$userpostdata['eddate'];
        
        $detail=array(
            'stpname'=>$pname,
           'stsno'=>$sno,
           'stdegree'=>$degree,
           'stcourse'=>$course,
           'stuname'=>$uname,
           'stuloc'=>$uloc,
           'ststname'=>$stname,

           'stguidencename'=>$guiname,
           'ststdate'=>$stdate,
           'steddate'=>$eddate
          

        );
        $fire = new db();
        $result = $fire->performcurd("st_data", 'i', $detail, []);
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



