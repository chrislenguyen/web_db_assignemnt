<?php
    require_once("models/user_model.php");
    function checkAccess() {
        $userModel = new UserModel();
        // echo $_POST["name"] . $_POST["pass"];
        $name = $_POST["name"];
        $pass = $_POST["pass"];
        $result = $userModel->login($_POST["name"], $_POST["pass"]);
        
        if ($result == true) {
            $_SESSION['name'] = $name;
            $_SESSION['pass'] = $pass;
        }
        return $result;
    }

    function logOut() {
        session_unset();
    }
?>