<?php 
	class DbModel {
        private $servername = "group5-database.database.windows.net";
        // private $username = "THUCQUYEN";
        // private $password = "group5@123";     
        private $db = "HospitalDB"; 
        private $conn = "";

        public function getConn() {
            return $this->conn;
        }

        public function setConn($conn) {
            $this->conn = $conn;
        }

		public function connect($username, $password) {
            // $result = "";
            $servername = $this->servername;
            $connectionOptions = array(
                "Database" => $this->db, 
                "UID" => $username, 
                "PWD" => $password 
            );
            //Establishes the connection
            $conn = sqlsrv_connect($servername, $connectionOptions);

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
            // $this->conn = $conn;
            return $conn;
		}
	}
?> 
