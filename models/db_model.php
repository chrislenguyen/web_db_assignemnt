<?php 
	class DbModel {
        private $servername = "group5-database.database.windows.net";
        // private $username = "THUCQUYEN";
        // private $password = "group5@123";     
        private $db = "HospitalDB"; 

		public function connect($username, $password) {
            $result = "";
            $servername = $this->servername;
            $connectionOptions = array(
                "Database" => $this->db, 
                "UID" => $username, 
                "PWD" => $password 
            );
            //Establishes the connection
            $conn = sqlsrv_connect($servername, $connectionOptions);

            // if($conn) {
                // echo "Connection established.<br />";
                // $tsql= "SELECT * FROM hospital.EMPLOYEE"; 
                // $getResults= sqlsrv_query($conn, $tsql);
                // // echo ("Reading data from table" . PHP_EOL);
                // if ($getResults == FALSE)
                // echo (sqlsrv_errors());
                // while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
                // echo ($row['First_Name'] . " " . $row['Last_Name'] . PHP_EOL);
                // }
                // sqlsrv_free_stmt($getResults);
            // }
            // } else{
                // die("Connection could not be established.");
                // die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
                // echo sqlsrv_errors(SQLSRV_ERR_ALL);
            // }
            // if (!$conn) {
            //     die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            //     return false;
            // }
            // return true;
            return $conn;
		}
	}
?> 
