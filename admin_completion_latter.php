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
        include("partial/conn.php");
        include("partial/db.php");
        $fire = new db();
        $path=explode('/',$_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $userid=$path[3];
            // echo $userid;
            $fire = new db();
            $result = $fire->performcurd("add_comp_letter", 's', [], ['id' => $userid]);
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "Category not found for provided ID"]);
            }
        }
        elseif (isset($_GET['stid']) && is_numeric($_GET['stid'])) {
            $cateid = $_GET['stid'];
            $fire = new db();
            $result = $fire->performcurd("add_comp_letter", 's', [], ['id' => $cateid]);
            
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "Category not found for provided ID"]);
            }
        }
        else{
        $result = $fire->performcurd("add_comp_letter", 's', [], []);

        
        if (!empty($result)) {
            
            echo json_encode(["result" => $result]);
            
            return;
         
        } else {
            echo json_encode(["not" => "No data found"]);
        }}
        break;


    case "POST":
        include("partial/db.php");
        $userpostdata = json_decode(file_get_contents("php://input"), true);
        
        $proname = htmlspecialchars($userpostdata['pro_name']);
        $sem_no = htmlspecialchars($userpostdata['sem_no']);
        $degree = htmlspecialchars($userpostdata['degree']);
        $course = htmlspecialchars($userpostdata['course']);
        $uni_name = htmlspecialchars($userpostdata['uni_name']);
    
        
        $uni_loc = htmlspecialchars($userpostdata['uni_location']);
        $st_name = htmlspecialchars($userpostdata['student_name']);
        $guide_name = htmlspecialchars($userpostdata['guide_name']);
        $stdate = htmlspecialchars($userpostdata['inter_st_date']);
        $enddate = htmlspecialchars($userpostdata['inter_end_date']);
        $today_date = htmlspecialchars($userpostdata['today_date']);
        $dept = htmlspecialchars($userpostdata['dept_name']);
        $superwisename = htmlspecialchars($userpostdata['supervision_name']);
    
        $detail=array(
            'pro_name'=>$proname,
              'sem_no'=>$sem_no,
              'degree'=>$degree,
              'course'=>$course,
              'uni_name'=>$uni_name,
              'uni_location'=>$uni_loc,
              'student_name'=>$st_name,
              'guide_name'=>$guide_name,
              'inter_st_date'=>$stdate,
              'inter_end_date'=>$enddate,
       
              'today_date'=>$today_date,
            
              'dept_name'=>$dept,
              'supervision_name'=>$superwisename,
        );
        $fire = new db();
        $result = $fire->performcurd("add_comp_letter", 'i', $detail, []);
        if ($result) {
            echo json_encode(["suc" => "data Added Successfully"]);
        } else {
            echo json_encode(["error" => "Please Check the User Data!"]);
        }
        break;
        case "PUT":
            include("partial/db.php");
        
            // Decode JSON data into an associative array
            $updata = json_decode(file_get_contents("php://input"), true);
           
            $upid = $updata['id'];
            // echo $upid;
            $upproname = htmlspecialchars($updata['pro_name']);
            $upsem_no = htmlspecialchars($updata['sem_no']);
            $updegree = htmlspecialchars($updata['degree']);
            $upcourse = htmlspecialchars($updata['course']);
            $upuni_name = htmlspecialchars($updata['uni_name']);
        
            
            $upuni_loc = htmlspecialchars($updata['uni_location']);
            $upst_name = htmlspecialchars($updata['student_name']);
            $upguide_name = htmlspecialchars($updata['guide_name']);
            $up_stdate = htmlspecialchars($updata['inter_st_date']);
            $up_enddate = htmlspecialchars($updata['inter_end_date']);
            $up_today_date = htmlspecialchars($updata['today_date']);
            $up_dept = htmlspecialchars($updata['dept_name']);
            $up_superwisename = htmlspecialchars($updata['supervision_name']);
           
       
        
            // Perform database update
            $fire = new db();
                 // Prepare data array for database update
                 $data = array(
                    'pro_name'=>$upproname,
              'sem_no'=>$upsem_no,
              'degree'=>$updegree,
              'course'=>$upcourse,
              'uni_name'=>$upuni_name,
              'uni_location'=>$upuni_loc,
              'student_name'=>$upst_name,
              'guide_name'=>$upguide_name,
              'inter_st_date'=>$up_stdate,
              'inter_end_date'=>$up_enddate,
       
              'today_date'=>$up_today_date,
            
              'dept_name'=>$up_dept,
              'supervision_name'=>$up_superwisename,
            
                   );
            $result = $fire->performcurd("add_comp_letter", 'u', $data, ['id' => $upid]);
        
            // Check if the update was successful
            if ($result) {
                http_response_code(200); // OK
                echo json_encode(["success" => "Update successful"]);
            } else {
           // Internal Server Error
                echo json_encode(["error" => "Update failed"]);
            }
            break;
        

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
        case "DELETE":
            include("partial/db.php");
             $path= explode('/', $_SERVER["REQUEST_URI"]);
        
            if(isset($_GET['deid'])) {
                $id = $_GET['deid'];
                // echo $id;
                $fire = new db();
                $result = $fire->performcurd("add_comp_letter", 'd', [], ['id' => $id]);
                if($result){
                    echo json_encode(["suc" => "data Added Successfully"]);
                }
                // echo $result; // Assuming you want to echo the result
            } else {
                echo "Error: No 'deid' parameter provided.";
            }
            break;
}




?>



