<?php 
	class DbModel {
        private $servername = "group5-hospital.database.windows.net";
        private $username = "THUCQUYEN";
        private $password = "group5@123";     
        private $db = "HospitalDB"; 

		public function connect(){
            try {  
                // $conn = new PDO("sqlsrv:server=$this->servername; Database = $this->db", $this->username, $this->password); 
                $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->db);
                // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   
            }  
            catch(PDOException $e) {  
                die("Error connecting to SQL Server" . $e);   
            }  
            
            echo "Connected to SQL Server\n";  
//             $conn= mysqli_connect($this->servername, $this->username, $this->password, $this->db);
// 			if($conn === false){
//                 echo "Could not connect to database";
//                 die;
//             }
//             return $conn ;
            
//             $database = "AdventureWorks";  
 
  
   
  
//    $query = 'select * from Person.ContactType';   
//    $stmt = $conn->query( $query );   
//    while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){   
//       print_r( $row );   
//    }  
  
//    // Free statement and connection resources.   
//    $stmt = null;   
//    $conn = null; 
		}
	}
?> 
