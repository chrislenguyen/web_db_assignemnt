<?php
    session_start();
    require_once("controllers/access_controller.php");
    require_once("views/header.html");

    if (isset($_POST['name']) && isset($_POST['pass'])) {
        checkAccess();
    }
    if (!isset($_SESSION['name'])) {
        $_SESSION['name'] = "";
    }
    $user = $_SESSION['name'];
    // echo $user;

    if ($user == "") {
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
            if ($page == "search" || $page == "add" || $page == "doctor" || $page == "report") {
                require_once("views/exception.html");
            } elseif ($page == "logout") {
                logOut();
                require_once("views/login_view.html");
            } else {
                require_once("views/login_view.html");
            }
        } else {
            require_once("views/login_view.html");
        }
    } else {
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
            if ($page == "home") {
                require_once("views/home.html");
            } elseif ($page == "search") {
                require_once("views/search_patient_view.html");
            } elseif ($page == "add") {
                require_once("views/add_patient_view.html");
            } elseif ($page == "doctor") {
                require_once("views/view_doctor_view.html");
            } elseif ($page == "report") {
                require_once("views/report_view.html");
            } elseif ($page == "logout") {
                logOut();
                require_once("views/login_view.html");
            } else {
                require_once("views/home.html");
            }
        } else {
            require_once("views/home.html");
        }
    }
    require_once("views/footer.html");
?>
