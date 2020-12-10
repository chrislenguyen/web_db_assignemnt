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

class Inpatient extends Patient {
    private $adDate;
    private $disDate;
    private $start;
    private $end;
    private $result;
    private $doctor;

    public function getAdDate() {
        return $this->adDate;
    }

    public function getDisDate() {
        return $this->disDate;
    }

    public function getStart() {
        return $this->start;
    }

    public function getEnd() {
        return $this->end;
    }

    public function setAdDate($adDate) {
        $this->adDate = $adDate;
    }

    public function setDisDate($disDate) {
        $this->disDate = $disDate;
    }

    public function setStart($start) {
        $this->start = $start;
    }

    public function setEnd($end) {
        $this->end = $end;
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
        $patientName, 
        $name, 
        $pass
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $patientList = array();

            $sql = "SELECT 
                        P.Patient_ID, P.First_Name, P.Last_Name, P.Phone, A.Admission_Date, A.Discharge_Date, T.START_DATE, T.END_DATE, T.Result, CONCAT(e.Last_Name, ' ', E.First_Name) AS Doctor_Name
                    FROM 
                        hospital.INPATIENT AS P
                    JOIN 
                        hospital.ADMISSION AS A ON A.Patient_ID = P.Patient_ID
                    JOIN 
                        hospital.TREATMENT AS T ON T.Admission_ID = A.Admission_ID
                    JOIN 
                        hospital.TREATMENT_DOCTOR AS TD ON TD.Treatment_ID = T.Treatment_ID AND A.Admission_ID = TD.Admission_ID
                    JOIN 
                        hospital.EMPLOYEE AS E ON E.Employee_ID = TD.Doctor_ID
                    WHERE 
                        P.First_Name = ?
                        OR 
                        P.Last_Name LIKE ?
                        OR
                        P.Last_Name LIKE ?
                        OR 
                        CONCAT(P.Last_Name, ' ', P.First_Name) LIKE ?
                        OR 
                        CONCAT(P.First_Name, ' ', P.Last_Name) LIKE ?
                        OR 
                        P.Patient_ID LIKE ?";

            $stmt = sqlsrv_prepare($conn, $sql, array("$patientName", "$patientName%", "%$patientName", "$patientName%", "$patientName%", "$patientName%"));
            if( !$stmt ) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);

            if ($getResults == FALSE) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $inpatientList = array();
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $inpatientList[] = array(
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                    "adDate" => $row['Admission_Date'],
                    "disDate" => $row['Discharge_Date'],
                    "start" => $row['START_DATE'],
                    "end" => $row['END_DATE'],
                    "result" => $row['Result'],
                    "doctor" => $row['Doctor_Name']
                );
            }
            $patientList[] = $inpatientList;


            // $sql = "SELECT 
            //             P.Patient_ID, P.First_Name, P.Last_Name, P.Phone, A.Admission_Date, A.Discharge_Date, T.START_DATE, T.END_DATE, T.Result, CONCAT(e.Last_Name, ' ', E.First_Name) AS Doctor_Name
            //         FROM 
            //             hospital.INPATIENT AS P
            //         JOIN 
            //             hospital.ADMISSION AS A ON A.Patient_ID = P.Patient_ID
            //         JOIN 
            //             hospital.TREATMENT AS T ON T.Admission_ID = A.Admission_ID
            //         JOIN 
            //             hospital.TREATMENT_DOCTOR AS TD ON TD.Treatment_ID = T.Treatment_ID AND A.Admission_ID = TD.Admission_ID
            //         JOIN 
            //             hospital.EMPLOYEE AS E ON E.Employee_ID = TD.Doctor_ID
            //         WHERE 
            //             P.First_Name = ?
            //             OR 
            //             P.Last_Name LIKE ?
            //             OR
            //             P.Last_Name LIKE ?
            //             OR 
            //             CONCAT(P.Last_Name, ' ', P.First_Name) LIKE ?
            //             OR 
            //             CONCAT(P.First_Name, ' ', P.Last_Name) LIKE ?
            //             OR 
            //             P.Patient_ID LIKE ?";

            // $stmt = sqlsrv_prepare($conn, $sql, array("$patientName", "$patientName%", "%$patientName", "$patientName%", "$patientName%", "$patientName%"));
            // if( !$stmt ) {
            //     echo ( print_r( sqlsrv_errors(), true));
            //     return false;
            // }
            // $getResults = sqlsrv_execute($stmt);

            // if ($getResults == FALSE) {
            //     echo ( print_r( sqlsrv_errors(), true));
            //     return false;
            // } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            //     $patient = new Patient();
            //     $patient->setpId($row['Patient_ID']);
            //     $patient->setFName($row['First_Name']);
            //     $patient->setLName($row['Last_Name']);
            //     $patient->setPhone($row['Phone']);
            //     $patientList[] = $patient;
            // }

            return $patientList;
        }
    }

    public function queryGetDrugList(
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
                    ORDER BY 
                        Name"; 
            // $getResults= sqlsrv_query($conn, $sql);
            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                echo( print_r( sqlsrv_errors(), true));
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
    

    public function callProcAddNewOutPatient(
        $name, 
        $pass,
        $fName,
        $lName,
        $dob,
        $addr,
        $gender,
        $phone,
        $examDate,
        $secondDate,
        $doctorId,
        $fee,
        $diagnosis
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql= "EXEC hospital.NewOutPatient 
                        @First_Name = '$fName'
                        ,@Last_Name = '$lName'
                        ,@Phone = '$phone'
                        ,@Address = '$addr'
                        ,@Gender = '$gender'
                        ,@Date_Of_Birth = '$dob'
                        ,@Doctor_Exam_ID = '$doctorId'
                        ,@Exam_Date = '$examDate'
                        ,@Second_Exam_Date = '$secondDate'
                        ,@Diagnosis = '$diagnosis'
                        ,@Fee = '$fee'"; 

            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                echo ( print_r( sqlsrv_errors(), true)) . "1";
                return false;
            }
            $getResults = sqlsrv_execute($stmt);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                echo (print_r( sqlsrv_errors(), true)) . "2";
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            }


            $sql = "SELECT 
                        MAX(Patient_ID) AS Max
                    FROM
                        hospital.OUTPATIENT
                    WHERE 
                        First_Name = '$fName' AND Last_Name = '$lName'";

            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                echo ( print_r( sqlsrv_errors(), true)) . "3";
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
            $result = array();
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $result[] = $row['Max'];
            }
            if (sizeof($result) != 1) {
                return false;
            }
            // echo "OK";
            return $result[0];
        }
    }

    public function callProcNewTExaminationMedication(
        $name,
        $pass,
        $pId,
        $eId,
        $code,
        $amount
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql = "EXEC hospital.NewTExaminationMedication
                        @Patient_ID = '$pId'
                        ,@Exam_ID = '$eId'
                        ,@Drug_Code = '$code'
                        ,@Amount = '$amount'"; 

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
                        f.Exam_ID, f.Exam_Date, f.Second_Exam_Date, f.Diagnosis, f.Fee, f.Name, f.Amount, f.Price, f.Expiration_Date, f.Out_Date
                    FROM 
                        hospital.OUTPATIENT p
                    INNER JOIN 
                    (
                        SELECT 
                            c.Patient_ID, e.Exam_ID, e.Exam_Date, e.Second_Exam_Date, e.Diagnosis, e.Fee, c.Name, c.Amount, c.Effects, c.Price, c.Expiration_Date, c.Out_Date 
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
                    "examId" => $row['Exam_ID'],
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
                return -1;
            }
            return $result;
            // return true;
            // return $doctorList;
        }
    }
}