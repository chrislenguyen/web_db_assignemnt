<?php
require_once('../models/db_model.php');

class Employee {
    private $eId;
    private $fName;
    private $lName;

    public function getEId() {
        return $this->eId;
    }

    public function getFName() {
        return $this->fName;
    }

    public function getLName() {
        return $this->lName;
    }

    public function setEId($eId) {
        $this->eId = $eId;
    }

    public function setFName($fName) {
        $this->fName = $fName;
    }

    public function setLName($lName) {
        $this->lName = $lName;
    }
}

class Doctor extends Employee {
    private $patientList;
}

class DoctorModel extends DbModel {
    public function queryGetDoctorNameList($name, $pass) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            // echo "Connection established.<br />";
            $sql= "SELECT 
                        Employee_ID, First_Name, Last_Name
                    FROM 
                        hospital.EMPLOYEE
                    WHERE
                        Job_Type = 'd' AND Employee_ID > 0" ; 
            $getResults= sqlsrv_query($conn, $sql);
            // echo ("Reading data from table" . PHP_EOL);
            $doctorList = array();
            if ($getResults == FALSE) {
                // echo (sqlsrv_errors());
            } else {
                while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
                    // echo json_encode ($row['First_Name'] . " " . $row['Last_Name'] . PHP_EOL);
                    $doctor = new Doctor();
                    $doctor->seteId($row['Employee_ID']);
                    $doctor->setFName($row['First_Name']);
                    $doctor->setLName($row['Last_Name']);
                    $doctorList[] = $doctor;
                }
            }
            sqlsrv_free_stmt($getResults);
            // return true;
            return $doctorList;
        }
    }
}