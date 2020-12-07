<?php
    session_start();
    require_once('../models/patient_model.php');
    require_once('../models/employee_model.php');
    // $hmm = $_REQUEST["function"];
    // echo json_encode($hmm);
    if ($_REQUEST["function"] == "test") {
        $patient = new PatientModel();
        // $patient->connect($_SESSION['name'], $_SESSION['pass']);
    } elseif ($_REQUEST["function"] == "search") {
        $patient = new PatientModel();
        $patient->queryGetPatientNameList($_REQUEST["data"], $_SESSION["name"], $_SESSION["pass"]);
        // $patient->connect($_SESSION['name'], $_SESSION['pass']);
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
    } else {
        echo json_encode("nothing");
    }

?>