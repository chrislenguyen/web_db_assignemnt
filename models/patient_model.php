<?php
require_once('../models/db_model.php');
class Patient {
    private $pId;
    private $fName;
    private $lName;
    private $phone;

    public function getpId() {
        return $this->pId;
    }

    public function getFName() {
        return $this->fName;
    }

    public function getLName() {
        return $this->lName;
    }

    public function getPhone() {
        return $this->phone;
    }

    public function setpId($pId) {
        $this->pId = $pId;
    }

    public function setFName($fName) {
        $this->fName = $fName;
    }

    public function setLName($lName) {
        $this->lName = $lName;
    }

    public function setPhone($phone) {
        $this->phone = $phone;
    }

}

class Drug {
    private $drugCode;
    private $name;
    private $effects;
    private $price;

    public function getDrugCode() {
        return $this->drugCode;
    }

    public function getName() {
        return $this->name;
    }

    public function getEffects() {
        return $this->effects;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setDrugCode($drugCode) {
        $this->drugCode = $drugCode;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setEffects($effects) {
        $this->effects = $effects;
    }

    public function setPrice($price) {
        $this->price = $price;
    }
}

class PatientModel extends DbModel 
{
    public function queryGetPatientNameList(
        $patientName, $name, $pass
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $words = explode(' ',trim($patientName));
            $firstWord = $words[0];
            $lastWord = array_pop($words);
            $firstStr = "";
            $lastStr = "";
            // echo json_encode($firstWord . $lastWord . $firstStr . $lastStr);
            if ($firstWord != $lastWord) {
                $last_word_start = strrpos($patientName, ' '); 
                $firstStr = substr($patientName, 0, $last_word_start);
                $lastStr = substr(strstr($patientName," "), 1);
            } 
            
            $patientList = array();
            // echo json_encode($firstWord . $lastWord . $firstStr . $lastStr);

            $sql= "SELECT 
                        * 
                    FROM 
                        hospital.INPATIENT
                    WHERE
                        First_Name = ? 
                        OR 
                        Last_Name LIKE ?
                        OR 
                        (First_Name = ? AND Last_Name LIKE ?)
                        OR 
                        (First_Name = ? AND Last_Name LIKE ?)
                        OR 
                        Patient_ID LIKE ?";

            $stmt = sqlsrv_prepare($conn, $sql, array($patientName, "%$patientName", $firstWord, "%$lastStr%", $lastWord, "%$firstStr%", "$patientName%"));
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);

            // $getResults= sqlsrv_query($conn, $sql);

            if ($getResults == FALSE) {
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $patient = new Patient();
                $patient->setpId($row['Patient_ID']);
                $patient->setFName($row['First_Name']);
                $patient->setLName($row['Last_Name']);
                $patient->setPhone($row['Phone']);
                $patientList[] = $patient;
            }
            // sqlsrv_free_stmt($getResults);

            $sql= "SELECT 
                        * 
                    FROM 
                        hospital.OUTPATIENT
                    WHERE
                        First_Name = ? 
                        OR 
                        Last_Name LIKE ?
                        OR 
                        (First_Name = ? AND Last_Name LIKE ?)
                        OR 
                        (First_Name = ? AND Last_Name LIKE ?)
                        OR 
                        Patient_ID LIKE ?";

            $stmt = sqlsrv_prepare($conn, $sql, array($patientName, "%$patientName%", $firstWord, "%$lastStr%", $lastWord, "%$firstStr%", "$patientName%"));
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);

            // $getResults= sqlsrv_query($conn, $sql);

            if ($getResults == FALSE) {
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $patient = new Patient();
                $patient->setpId($row['Patient_ID']);
                $patient->setFName($row['First_Name']);
                $patient->setLName($row['Last_Name']);
                $patient->setPhone($row['Phone']);
                $patientList[] = $patient;
            }
            // sqlsrv_free_stmt($getResults);

            return $patientList;
        }
    }

    public function queryGetDrugList(
        $name, $pass
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $drugList = array();

            $sql= "SELECT 
                        * 
                    FROM 
                        hospital.MEDICATION
                    ORDER BY 
                        Name"; 
            // $getResults= sqlsrv_query($conn, $sql);
            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                // echo (sqlsrv_errors());
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $drug = new Drug();
                $drug->setDrugCode($row['Drug_Code']);
                $drug->setName($row['Name']);
                $drug->setEffects($row['Effects']);
                $drug->setPrice($row['Price']);
                $drugList[] = $drug;
            }
            // sqlsrv_free_stmt($getResults);

            return $drugList;
        }
    }

    public function callProcAddNewInPatient(
        $name, 
        $pass,
        $fName,
        $lName,
        $dob,
        $addr,
        $gender,
        $phone,
        $date,
        $nurseId,
        $doctorId,
        $room,
        $fee,
        $diagnosis
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql= "EXEC hospital.NewInpatient 
                        @First_Name = '$fName',
                        @Last_Name = '$lName',
                        @Date_Of_Birth ='$dob',
                        @Gender ='$gender',
                        @Address = '$addr',
                        @Phone = '$phone',
                        @Nurse_ID = '$nurseId',
                        @Admission_Date = '$date',
                        @Sickroom = '$room',
                        @Diagnosis = '$diagnosis',
                        @Fee = '$fee',
                        @Doctor_ID = '$doctorId'"; 

            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                die (print_r( sqlsrv_errors(), true));
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            }
            // echo "OK";
            return true;
        }
    }
    


    public function queryGetDrugByCode(
        $code, 
        $name, 
        $pass
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $drugList = array();

            $sql= "SELECT 
                        * 
                    FROM 
                        hospital.MEDICATION
                    WHERE 
                        Drug_Code = '$code"; 
            $getResults= sqlsrv_query($conn, $sql);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                // echo (sqlsrv_errors());
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
                $drug = new Drug();
                $drug->setDrugCode($row['Drug_Code']);
                $drug->setName($row['Name']);
                $drug->setEffects($row['Effects']);
                $drug->setPrice($row['Price']);
                $drugList[] = $drug;
            }
            sqlsrv_free_stmt($getResults);

            // echo $drugList;

            return $drugList;
        }
    }

    public function queryGetPatientsByDoctorId($name, $pass, $dId) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql= " SELECT 
                        p.Patient_ID, p.First_Name, p.Last_Name, p.Phone, p.Address, p.Gender, p.Date_Of_Birth, 
                        f.Exam_Date, f.Second_Exam_Date, f.Diagnosis, f.Fee, f.Name, f.Amount, f.Price, f.Expiration_Date, f.Out_Date
                    FROM 
                        hospital.OUTPATIENT p
                    INNER JOIN 
                    (
                        SELECT 
                            c.Patient_ID, e.Exam_Date, e.Second_Exam_Date, e.Diagnosis, e.Fee, c.Name, c.Amount, c.Effects, c.Price, c.Expiration_Date, c.Out_Date 
                        FROM 
                            hospital.EXAMINATION e
                        INNER JOIN 
                        (
                            SELECT 
                                m.Patient_ID, m.Exam_ID, e_m.Name, m.Amount, e_m.Effects, e_m.Price, e_m.Expiration_Date, e_m.Out_Date
                            FROM 
                            hospital.MEDICATION e_m 
                            INNER JOIN 
                                hospital.EXAMINATION_MEDICATION m 
                            ON 
                                e_m.Drug_Code = m.Drug_Code
                        ) c
                        ON 
                            e.Patient_ID = c.Patient_ID AND e.Exam_ID = c.Exam_ID 
                        WHERE 
                            e.Doctor_Exam_ID = '$dId'
                    ) f
                    ON 
                        f.Patient_ID = p.Patient_ID" ; 
            $result = array();
            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                die (print_r( sqlsrv_errors(), true));
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                // echo implode($row);
                $result[] = array (
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                    "addr" => $row['Address'],
                    "gender" => $row['Gender'],
                    "dob" => $row['Date_Of_Birth'],
                    "examDate" => $row['Exam_Date'],
                    "secondDate" => $row['Second_Exam_Date'],
                    "diagnosis" => $row['Diagnosis'],
                    "fee" => $row['Fee'],
                    "name" => $row['Name'],
                    "amount" => $row['Amount'],
                    "price" => $row['Price'],
                    "exDate" => $row['Expiration_Date']
                );
            }
            if (sizeof($result) < 1) {
                return false;
            }
            return $result;
            // return true;
            // return $doctorList;
        }
    }
}