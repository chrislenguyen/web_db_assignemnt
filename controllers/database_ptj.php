<?php
    require_once('../models/patient_model.php');

    if ($_REQUEST["function"] == "test") {
        $patient = new PatientModel();
        $patient->connect();
    } else {
        echo json_encode("nothing");
    }

?>