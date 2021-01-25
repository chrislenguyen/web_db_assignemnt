<?php 
	class DbModel {
        private $servername = "group5-database.database.windows.net";    
        private $db = "HospitalDB"; 

		public function connect($username, $password) {
            $servername = $this->servername;
            $connectionOptions = array(
                "Database" => $this->db, 
                "UID" => $username, 
                "PWD" => $password 
            );
            //Establishes the connection
            $conn = sqlsrv_connect($servername, $connectionOptions);

            $sql = "IF (IS_MEMBER('db_datareader') = 1  and IS_MEMBER('db_datawriter') = 1)
                    SELECT 1
                ELSE 
                    SELECT 0;";

            $getResults = sqlsrv_query($conn, $sql);
            if ($getResults == FALSE) {
                return false;
            } 
            while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
                if (implode($row) == 1) {
                    return $conn;
                }
            }
            return false;
		}
	}
?> 
