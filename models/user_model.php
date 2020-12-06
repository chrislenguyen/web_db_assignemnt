<?php
require_once('db_model.php');

class User {
    private $username;
    private $password;
}

class UserModel extends DbModel {
    public function login($username, $password) {
        if ($username == "" || $password == "") {
            echo "Nothing";
            return false;
        }
        $conn = $this->connect($username, $password);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        }
         return true;
        // echo "<br>" . $conn;
        
        // if ($conn) {
            // echo "Connection established.<br />";
            // $tsql= "SELECT * FROM hospital.EMPLOYEE"; 
            // $getResults= sqlsrv_query($conn, $tsql);
            // echo ("Reading data from table" . PHP_EOL);
            // if ($getResults == FALSE)
            // echo (sqlsrv_errors());
            // while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
            //     echo ($row['First_Name'] . " " . $row['Last_Name'] . PHP_EOL);
            // }
            // sqlsrv_free_stmt($getResults);
            // return true;
        // }
    }
}
?>