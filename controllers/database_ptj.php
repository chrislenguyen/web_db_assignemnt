<?php
    session_start();
    require_once('../models/patient_model.php');
    require_once('../models/employee_model.php');

    function test_input($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        $data = str_replace("'", "''", $data);
        return $data;
    }

    if ($_REQUEST["function"] == "test") {
        $patient = new PatientModel();
        // $patient->connect($_SESSION['name'], $_SESSION['pass']);
    } elseif ($_REQUEST["function"] == "searchPatient") {
        $result = array();
        $patientModel = new PatientModel();
        $patientList = $patientModel->queryGetPatientNameList(test_input($_REQUEST["data"]), $_SESSION["name"], $_SESSION["pass"]);
        if ($patientList == false) {
            echo false;
        } else {
            for ($i = 0; $i < sizeof($patientList); $i++) {
                $result[$i] = array (
                    "pId" => $patientList[$i]->getpId(),
                    "fName" => $patientList[$i]->getFName(),
                    "lName" => $patientList[$i]->getLName(),
                    "phone" => $patientList[$i]->getPhone()
                );
            }
        }
        echo json_encode($result);
        // }
    } elseif ($_REQUEST["function"] == "getDoctor") {
        $doctorModel = new DoctorModel();
        $doctorList = $doctorModel->queryGetDoctorNameList($_SESSION["name"], $_SESSION["pass"]);
        $result = array();
        for ($i = 0; $i < sizeof($doctorList); $i++) {
            $result[$i] = array (
                "eId" => $doctorList[$i]->geteId(),
                "fName" => $doctorList[$i]->getFName(),
                "lName" => $doctorList[$i]->getLName(),
            );
        }
        echo json_encode($result);
    } elseif ($_REQUEST["function"] == "getDrugList") {
        $result = array();
        $patientModel = new PatientModel();
        $drugList = $patientModel->queryGetDrugList($_SESSION["name"], $_SESSION["pass"]);
        if ($drugList == false) {
            echo false;
        } else {
            for ($i = 0; $i < sizeof($drugList); $i++) {
                $result[$i] = array (
                    "code" => $drugList[$i]->getDrugCode(),
                    "name" => $drugList[$i]->getName(),
                    "effects" => $drugList[$i]->getEffects(),
                    "price" => $drugList[$i]->getPrice()
                );
            }
        }
        echo json_encode($result);
    } elseif ($_REQUEST["function"] == "addInpatient") {
        $patientModel = new PatientModel();
        $result = $patientModel->callProcAddNewInPatient(
            $_SESSION["name"], 
            $_SESSION["pass"],
            $_REQUEST["fName"],
            $_REQUEST["lName"],
            $_REQUEST["dob"],
            $_REQUEST["addr"],
            $_REQUEST["gender"],
            $_REQUEST["phone"],
            $_REQUEST["date"],
            $_REQUEST["nurseId"],
            $_REQUEST["doctorId"],
            $_REQUEST["room"],
            $_REQUEST["fee"],
            $_REQUEST["diagnosis"]
        );
        if ($result == true) {
            echo true;
        } else {
            echo false;
        }
    } elseif ($_REQUEST["function"] == "addOutpatient") {
        $patientModel = new PatientModel();
        $result = $patientModel->callProcAddNewOutPatient(
            $_SESSION["name"], 
            $_SESSION["pass"],
            $_REQUEST["fName"],
            $_REQUEST["lName"],
            $_REQUEST["dob"],
            $_REQUEST["addr"],
            $_REQUEST["gender"],
            $_REQUEST["phone"],
            $_REQUEST["examDate"],
            $_REQUEST["secondDate"],
            $_REQUEST["doctorId"],
            $_REQUEST["fee"],
            $_REQUEST["diagnosis"]
        );
        if ($result == false) {
            echo false;
        } else {
            echo json_encode($result);
        }
    } elseif ($_REQUEST["function"] == "addDrug") {
        $patientModel = new PatientModel();
        $result = $patientModel->callProcNewTExaminationMedication(
            $_SESSION["name"], 
            $_SESSION["pass"],
            $_REQUEST["pId"],
            $_REQUEST["examId"],
            $_REQUEST["code"],
            $_REQUEST["amount"]
        );
        if ($result == true) {
            echo true;
        } else {
            echo false;
        }
    } elseif ($_REQUEST["function"] == "getPatientByDoctor") {
        $patientModel = new PatientModel();
        $result = $patientModel->queryGetPatientsByDoctorId(
            $_SESSION["name"], 
            $_SESSION["pass"],
            $_REQUEST["dId"]
            );
        
        if ($result != false) {
            echo json_encode($result);
        } else {
            echo false;
        }
    }else {
        echo json_encode("nothing");
    }

?>