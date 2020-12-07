<?php
require_once('../models/db_model.php');

class PatientModel extends DbModel 
{
    public function queryGetPatientNameList($patientName, $name, $pass) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            // echo "Connection established.<br />";
            $sql= "SELECT 
                        * 
                    FROM 
                        hospital.INPATIENT"; 
            $getResults= sqlsrv_query($conn, $sql);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE)
            echo (sqlsrv_errors());
            while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
                echo json_encode ($row['First_Name'] . " " . $row['Last_Name'] . PHP_EOL);
            }
            sqlsrv_free_stmt($getResults);
            // return true;
        }
    }
}