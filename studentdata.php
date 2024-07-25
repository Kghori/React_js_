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
            $result = $fire->performcurd("student", 's', [], ['id' => $userid]);
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "Category not found for provided ID"]);
            }
        }
        elseif (isset($_GET['stid']) && is_numeric($_GET['stid'])) {
            $cateid = $_GET['stid'];
            $fire = new db();
            $result = $fire->performcurd("student", 's', [], ['id' => $cateid]);
            
            if (!empty($result)) {
                                                                                                                                        ,                           echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "Category not found for provided ID"]);
            }
        }
        else{
        $result = $fire->performcurd("student", 's', [], []);

        
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
        
        $name = $userpostdata['name']; 
       $eno = $userpostdata['eno']; 
         $uni_name = $userpostdata['uni_name']; 
         $uni_loc = $userpostdata['uni_loc']; 
        $st_date=$userpostdata['st_date']; 
        
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
        case "DELETE":
            include("partial/db.php");
             $path= explode('/', $_SERVER["REQUEST_URI"]);
        
            if(isset($_GET['deid'])) {
                $id = $_GET['deid'];
                // echo $id;
                $fire = new db();
                $result = $fire->performcurd("student", 'd', [], ['id' => $id]);
                if($result){
                    echo json_encode(["suc" => "data Added Successfully"]);
                }
                // echo $result; // Assuming you want to echo the result
            } else {
                echo "Error: No 'deid' parameter provided.";
            }
            break;
            case "PUT":
                include("partial/db.php");
            
                // Decode JSON data into an associative array
                $updata = json_decode(file_get_contents("php://input"), true);
                // print_r($updata);
                // Check if the required fields are present
                
            
                // Extract data from the associative array
                $upid = $updata['id'];
                // echo $upid;
                $uname = htmlspecialchars($updata['name']);
                $uen_no = htmlspecialchars($updata['eno']);
                $uuniname = htmlspecialchars($updata['uni_name']);
                $uuni_loc = htmlspecialchars($updata['uni_loc']);
                $uup_sdate = htmlspecialchars($updata['st_date']);
            
                // Prepare data array for database update
                $data = array(
                 'name'=>$uname,
           'enroll_no'=>$uen_no,
           'university_name'=>$uuniname,
           'location'=>$uuni_loc,
           'date'=>$uup_sdate
                );
            
                // Perform database update
                $fire = new db();
                $result = $fire->performcurd("student", 'u', $data, ['id' => $upid]);
            
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
}




?>



