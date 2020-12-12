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
        $searchStr, 
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
                        P.Patient_ID, P.First_Name, P.Last_Name, P.Phone, 
                        A.Admission_ID, A.Admission_Date, A.Discharge_Date, T.START_DATE, T.END_DATE, T.Result, 
                        CONCAT(N.Last_Name, ' ', N.First_Name) as Nurse_Name, CONCAT(e.Last_Name, ' ', E.First_Name) AS Doctor_Name
                    FROM 
                        hospital.INPATIENT AS P
                    JOIN 
                        hospital.ADMISSION AS A ON A.Patient_ID = P.Patient_ID
                    JOIN 
                        hospital.TREATMENT AS T ON T.Admission_ID = A.Admission_ID
                    JOIN 
                        hospital.TREATMENT_DOCTOR AS TD ON TD.Treatment_ID = T.Treatment_ID AND A.Admission_ID = TD.Admission_ID
                    JOIN
                        hospital.EMPLOYEE AS N ON N.Employee_ID = A.Nurse_ID
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
                        P.Patient_ID LIKE ?
                    ORDER BY
                        P.Patient_ID";

            $stmt = sqlsrv_prepare($conn, $sql, array("$searchStr", "$searchStr%", "%$searchStr", "$searchStr%", "$searchStr%", "$searchStr%"));

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
                    "aId" => $row['Admission_ID'],
                    "adDate" => $row['Admission_Date'],
                    "disDate" => $row['Discharge_Date'],
                    "start" => $row['START_DATE'],
                    "end" => $row['END_DATE'],
                    "result" => $row['Result'],
                    "doctor" => $row['Doctor_Name'],
                    "nurse" => $row['Nurse_Name']
                );
            }
            $patientList[] = $inpatientList;


            $sql = "SELECT 
                        P.Patient_ID, P.Last_Name, P.First_Name, P.Phone, EX.Exam_Date, EX.Second_Exam_Date, 
                        CONCAT(E.Last_Name, ' ', E.First_Name) AS Doctor_Name, EX.Diagnosis
                    FROM 
                        hospital.OUTPATIENT AS P
                    JOIN 
                        hospital.EXAMINATION AS EX ON EX.Patient_ID = P.Patient_ID
                    JOIN
                        hospital.EMPLOYEE AS E ON E.Employee_ID = EX.Doctor_Exam_ID
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

            $stmt = sqlsrv_prepare($conn, $sql, array("$searchStr", "$searchStr%", "%$searchStr", "$searchStr%", "$searchStr%", "$searchStr%"));
            if( !$stmt ) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);

            if ($getResults == FALSE) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            } 
            $outpatientList = array();
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $outpatientList[] = array(
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                    "exDate" => $row['Exam_Date'],
                    "secondDate" => $row['Second_Exam_Date'],
                    "doctor" => $row['Doctor_Name'],
                    "diagnosis" => $row['Diagnosis']
                );
            }
            $patientList[] = $outpatientList;

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

            $sql = "SELECT 
                        A.Patient_ID, A.Admission_ID
                    FROM 
                        hospital.ADMISSION AS A
                    JOIN 
                        hospital.INPATIENT AS P ON P.Patient_ID = A.Patient_ID
                    JOIN (SELECT MAX(Patient_ID) as MAX FROM hospital.INPATIENT) J
                    ON A.Patient_ID = J.[MAX]";

            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                // echo ( print_r( sqlsrv_errors(), true));
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
                $result[] = array (
                    "pId" => $row['Patient_ID'],
                    "aId" => $row['Admission_ID']
                );
            }
            if (sizeof($result) != 1) {
                return false;
            }
            // echo $result[0] . $result[1];
            return $result;
            // echo "OK";
            // return true;
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

    public function callProcNewTreatmentMedication(
        $name,
        $pass,
        $aId,
        $tId,
        $code,
        $amount
    ) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql = "EXEC hospital.NewTreatmentMedication
                        @Admission_ID = $aId,
                        @Treatment_ID = $tId,
                        @Drug_Code = '$code',
                        @Amount = '$amount'"; 

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
            $patientList = array();

            $sql ="SELECT 
                        P.Patient_ID, P.Last_Name, P.First_Name, P.Phone, P.Address, P.Date_Of_Birth, P.Gender, 
                        EX.Exam_Date, EX.Second_Exam_Date, EX.Diagnosis, EX.Exam_ID, EX.Fee,
                        M.Name, EM.Amount, M.Price, M.Expiration_Date
                    FROM 
                        hospital.OUTPATIENT AS P
                    JOIN 
                        hospital.EXAMINATION AS EX ON EX.Patient_ID = P.Patient_ID
                    JOIN
                        hospital.EXAMINATION_MEDICATION AS EM ON EX.Exam_ID = EM.Exam_ID AND P.Patient_ID = EM.Patient_ID
                    JOIN
                        hospital.MEDICATION AS M ON M.Drug_Code = EM.Drug_Code
                    JOIN
                        hospital.EMPLOYEE AS E ON E.Employee_ID = EX.Doctor_Exam_ID
                    WHERE
                        EX.Doctor_Exam_ID = $dId
                    ORDER BY
                        P.Patient_ID, EX.Exam_ID";

            $outpatientList = array();
            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                // echo (print_r( sqlsrv_errors(), true));
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                // echo implode($row);
                $outpatientList[] = array (
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
            $patientList[] = $outpatientList;


            $sql ="SELECT 
                        P.Patient_ID, P.First_Name, P.Last_Name, P.Phone, P.Address, P.Date_Of_Birth, P.Gender, 
                        A.Admission_ID, A.Fee, A.Admission_Date, A.Discharge_Date, A.Diagnosis, 
                        T.Treatment_ID, T.START_DATE, T.END_DATE, T.Result, 
                        M.Name, TM.Amount, M.Price, M.Expiration_Date
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
                    JOIN 
                        hospital.TREATMENT_MEDICATION AS TM ON TM.Admission_ID = A.Admission_ID AND TM.Treatment_ID = T.Treatment_ID
                    JOIN 
                        hospital.MEDICATION AS M ON M.Drug_Code = TM.Drug_Code
                    WHERE
                        TD.Doctor_ID = $dId
                    ORDER BY
                        P.Patient_ID, A.Admission_ID, T.Treatment_ID";

            $inpatientList = array();
            $stmt = sqlsrv_prepare($conn, $sql, array());
            if( !$stmt ) {
                die( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);
            // echo ("Reading data from table" . PHP_EOL);
            if ($getResults == FALSE) {
                echo (print_r( sqlsrv_errors(), true));
                // echo json_encode(sqlsrv_errors());
                // echo json_encode("WHY");
                return false;
            } while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                // echo implode($row);
                $inpatientList[] = array (
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                    "addr" => $row['Address'],
                    "gender" => $row['Gender'],
                    "dob" => $row['Date_Of_Birth'],
                    "adId" => $row['Admission_ID'],
                    "adDate" => $row['Admission_Date'],
                    "disDate" => $row['Discharge_Date'],
                    "diagnosis" => $row['Diagnosis'],
                    "tId" => $row['Treatment_ID'],
                    "start" => $row['START_DATE'],
                    "end" => $row['END_DATE'],
                    "result" => $row['Result'],
                    "fee" => $row['Fee'],
                    "drug" => $row['Name'],
                    "amount" => $row['Amount'],
                    "price" => $row['Price'],
                    "exDate" => $row['Expiration_Date']
                );
            }
            $patientList[] = $inpatientList;


            if (sizeof($patientList) < 1) {
                return -1;
            }
            return $patientList;
            // return true;
            // return $doctorList;
        }
    }


    public function querySearchPatient($name, $pass, $patientName) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $patientList = array();

            $sql = "SELECT 
                        P.Patient_ID, P.First_Name, P.Last_Name, P.Phone
                    FROM 
                        hospital.INPATIENT AS P
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
                        P.Patient_ID LIKE ?
                    ORDER BY
                        P.Patient_ID";

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
                );
            }
            $patientList[] = $inpatientList;


            $sql = "SELECT 
                        P.Patient_ID, P.First_Name, P.Last_Name, P.Phone
                    FROM 
                        hospital.OUTPATIENT AS P
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
                        P.Patient_ID LIKE ?
                    ORDER BY
                        P.Patient_ID";

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
            $outpatientList = array();
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $outpatientList[] = array(
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                );
            }
            $patientList[] = $outpatientList;

            return $patientList;
        }
    }
    

    public function queyGetAllTreatmentByPatientId($name, $pass, $pId) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql = "SELECT 
                        P.Patient_ID, P.First_Name, P.Last_Name, P.Phone, P.Address, P.Gender, P.Date_Of_Birth,
                        A.Admission_ID, A.Fee, A.Admission_Date, A.Discharge_Date, 
                        T.Treatment_ID, T.START_DATE, T.END_DATE, T.Result,
                        M.Name, TM.Amount, M.Price,
                        CONCAT(E.Last_Name, ' ', E.First_Name) AS Doctor_Name
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
                    JOIN 
                        hospital.TREATMENT_MEDICATION AS TM ON TM.Admission_ID = A.Admission_ID AND TM.Treatment_ID = T.Treatment_ID
                    JOIN 
                        hospital.MEDICATION AS M ON M.Drug_Code = TM.Drug_Code
                    WHERE 
                        P.Patient_ID = '$pId'
                    ORDER BY 
                        A.Admission_ID, T.Treatment_ID";
            $stmt = sqlsrv_prepare($conn, $sql, array());

            if( !$stmt ) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);

            if ($getResults == FALSE) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $patientInfo = array();
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $patientInfo[] = array(
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                    "addr" => $row['Address'],
                    "gender" => $row['Gender'],
                    "dob" => $row['Date_Of_Birth'],
                    "aId" => $row['Admission_ID'],
                    "adDate" => $row['Admission_Date'],
                    "disDate" => $row['Discharge_Date'],
                    "fee" => $row['Fee'],
                    "tId" => $row['Treatment_ID'],
                    "start" => $row['START_DATE'],
                    "end" => $row['END_DATE'],
                    "result" => $row['Result'],
                    "drug" => $row['Name'],
                    "amount" => $row['Amount'],
                    "price" => $row['Price'],
                    "doctor" => $row['Doctor_Name']
                );
            }

            return $patientInfo;
        }
    }


    public function queyGetAllExaminationByPatientId($name, $pass, $pId) {
        $conn = $this->connect($name, $pass);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        } else {
            $sql = "SELECT 
                        P.Patient_ID, P.Last_Name, P.First_Name, P.Phone, P.Address, P.Date_Of_Birth, P.Gender, 
                        EX.Exam_Date, EX.Second_Exam_Date, EX.Diagnosis, EX.Exam_ID, EX.Fee,
                        M.Name, EM.Amount, M.Price,
                        CONCAT(E.Last_Name, ' ', E.First_Name) AS Doctor_Name
                    FROM 
                        hospital.OUTPATIENT AS P
                    JOIN 
                        hospital.EXAMINATION AS EX ON EX.Patient_ID = P.Patient_ID
                    JOIN
                        hospital.EXAMINATION_MEDICATION AS EM ON EX.Exam_ID = EM.Exam_ID AND P.Patient_ID = EM.Patient_ID
                    JOIN
                        hospital.MEDICATION AS M ON M.Drug_Code = EM.Drug_Code
                    JOIN
                        hospital.EMPLOYEE AS E ON E.Employee_ID = EX.Doctor_Exam_ID
                    WHERE 
                        P.Patient_ID = '$pId'
                    ORDER BY
                        EX.Exam_ID";
            $stmt = sqlsrv_prepare($conn, $sql, array());

            if( !$stmt ) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $getResults = sqlsrv_execute($stmt);

            if ($getResults == FALSE) {
                echo ( print_r( sqlsrv_errors(), true));
                return false;
            }
            $patientInfo = array();
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $patientInfo[] = array(
                    "pId" => $row['Patient_ID'],
                    "fName" => $row['First_Name'],
                    "lName" => $row['Last_Name'],
                    "phone" => $row['Phone'],
                    "addr" => $row['Address'],
                    "gender" => $row['Gender'],
                    "dob" => $row['Date_Of_Birth'],
                    "eId" => $row['Exam_ID'],
                    "exDate" => $row['Exam_Date'],
                    "secondDate" => $row['Second_Exam_Date'],
                    "diagnosis" => $row['Diagnosis'],
                    "fee" => $row['Fee'],
                    "drug" => $row['Name'],
                    "amount" => $row['Amount'],
                    "price" => $row['Price'],
                    "doctor" => $row['Doctor_Name']
                );
            }

            return $patientInfo;
        }
    }
}