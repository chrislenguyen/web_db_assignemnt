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
    } elseif ($_REQUEST["function"] == "search") {
        $result = array();
        // echo json_encode(test_input($_REQUEST["data"]));
        // if ($_REQUEST["data"] != "") { 
        // echo $_SESSION["name"] . $_SESSION["pass"] . $_SESSION["conn"];
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
    } else {
        echo json_encode("nothing");
    }

?>