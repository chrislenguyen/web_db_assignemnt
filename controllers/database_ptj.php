<?php
    session_start();
    require_once('../models/patient_model.php');

    if ($_REQUEST["function"] == "test") {
        $patient = new PatientModel();
        $patient->connect($_SESSION['name'], $_SESSION['pass']);
    } else {
        echo json_encode("nothing");
    }

?>