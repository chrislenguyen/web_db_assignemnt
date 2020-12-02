<?php
session_start();
include 'views/header.html';

define('STAFF', '2');
define('ADMIN', '3');

if (!isset($_SESSION['role'])) {
    $_SESSION['role'] = '';
}
$role = $_SESSION['role'];

if (isset($_GET['page'])) {
    $page = $_GET['page'];
    if ($page == "") {
        include "views/exception.html";
    } elseif ($page == "login") {
        $controller = isset($_GET['controller']) ? $_GET['controller'] . 'Controller' : 'UserController';
        $action = isset($_GET['action']) ? $_GET['action'] : 'getUser';

        require_once('controllers/login_controller.php');
        $usercontroller = new $controller();
        $usercontroller->$action();
    } elseif ($page == "logout") {
        $controller = isset($_GET['controller']) ? $_GET['controller'] . 'Controller' : 'UserController';
        $action = isset($_GET['action']) ? $_GET['action'] : 'logout';

        require_once('controllers/logout_controller.php');
        $usercontroller = new $controller();
        $usercontroller->$action();
    } elseif ($page == "home") {
        include "views/$page.html";
    } elseif ($page == "search") {
        include "views/search_patient_view.html";
    }  elseif ($page == "add") {
        include "views/add_patient_view.html";
    }  elseif ($page == "doctor") {
        include "views/view_doctor_view.html";
    } elseif ($page == "report") {
        include "views/report_view.html";
    } else {
        include "views/login_view.html";
    }
}
else include "views/login_view.html";
require_once 'views/footer.html';
