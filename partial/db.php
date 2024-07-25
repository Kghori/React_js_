<?php
    
class db {
    function performcurd($tablename, $operation, $data, $where) {
   
        include 'conn.php';
        global $conn;
        // echo "conn:".$conn;
        // if (!$conn || $conn->connect_error) {
        //     die("Connection failed: " . $conn->connect_error);
        // }

        foreach($data as $key => $values) {
            $data[$key] = $values;
        }

        switch(strtolower($operation)) {
            case "i":
                $columns = implode(", ", array_keys($data));
                $values = "'" . implode("','", $data) . "'";
                $sql = "INSERT INTO `$tablename` ($columns) VALUES ($values)";
                break; 
                $whereClause = "";
                $params = [];
                foreach($where as $key => $value) {
                    $whereClause .= "$key = :$key AND ";
                    $params[":$key"] = $value;
                }
                $whereClause = rtrim($whereClause, "AND ");
    
                // Construct the SQL query
                $sql = "SELECT * FROM $tablename";
                if (!empty($whereClause)) {
                    $sql .= " WHERE $whereClause";
                }
    
                // Prepare and execute the query
                $stmt = $this->$conn->prepare($sql);
                $stmt->execute($params);
    
                // Fetch and return the results
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $results;
                break;
                case "s":
                    // Construct the WHERE clause dynamically based on the $where array
                    $whereClause = "";
                    $params = [];
                    foreach($where as $key => $value) {
                        $whereClause .= "$key = :$key AND ";
                        $params[":$key"] = $value;
                    }
                    $whereClause = rtrim($whereClause, "AND ");
        
                    // Construct the SQL query
                    $sql = "SELECT * FROM $tablename";
                    if (!empty($whereClause)) {
                        $sql .= " WHERE $whereClause";
                    }
        
                    // Prepare and execute the query
                    $stmt =$conn->prepare($sql);
                    $stmt->execute($params);
        
                    // Fetch and return the results
                    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $results;
                    break;
            
            // case "s":
                    // $whereClause="";
                    // foreach($where as $key => $values){
                    //     $whereClause .= "$key = '$values' AND ";

                    // }
                    // $whereClause = rtrim($whereClause,"AND ");
                    // $sql = "SELECT  * FROM $tablename WHERE $whereClause";
                    // $fetch = $conn->prepare($sql);
                    // $fetch->execute();
                    // $num = $fetch->rowCount();
     
                    // if ($num > 0) { 
                    //     while ($row = $fetch->fetch(PDO::FETCH_ASSOC)) {
                    //         // Process each row
                    //         //   print_r($row);
                    //         $row1[]=$row; 
                    //         $rows[] = $row;
                                    
                    //     }
                    // // $status= "loggedin";
                    // }else{
                    //     // $status= "notlogin";
                    //     // $status1="not-cate";
                    //      echo "0 results";
                    // }    
                    // if ($rows == true) {
                    //     return $rows;
                    // } else if($row1==true){
                    //     return $row1;
                    //  }
                    //     break;
                    case "u":
                        $updatedata="";
                        foreach($data as $key => $values){
                            $updatedata.= "$key = '$values', ";
                        }
                        $updatedata=rtrim($updatedata," , ");
                        $whereClause="";
                        foreach($where as $key => $values){
                            $whereClause .="$key = '$values' AND ";
                        }
                        $whereClause = rtrim($whereClause," AND ");
                         $sql = "UPDATE $tablename SET $updatedata WHERE $whereClause";
                       
                        //  return $sql;
                        break;
                    case "d":
                        $whereClause="";
                        foreach($where as $key => $values){
                            $whereClause .="$key = '$values' AND ";
                        }
                        $whereClause = rtrim($whereClause," AND ");
                        $sql = "DELETE FROM $tablename WHERE $whereClause";
                        break;
                        
                            }
        error_reporting(0);
        if($conn->query($sql) === true) {
            $msg = "<h1>Operation successfully executed</h1>";  
        } else {
            $msg = "<h1>Operation error: " . $conn->errorInfo() . "</h1>";
        }
//    
            return $sql;
    }
  
}

?>