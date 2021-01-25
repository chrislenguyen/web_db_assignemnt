<?php
    session_start();
    if (isset($_SESSION['name'])) {
        $var = array(
            "name" => $_SESSION['name'],
        );
    } else {
        $var = false;
    }
    echo json_encode($var);
?>
