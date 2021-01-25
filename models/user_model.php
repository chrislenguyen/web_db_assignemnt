<?php
require_once('db_model.php');

class User {
    private $username;
    private $password;
}

class UserModel extends DbModel {
    public function login($username, $password) {
        if ($username == "" || $password == "") {
            echo "Nothing";
            return false;
        }
        $conn = $this->connect($username, $password);
        if (!$conn) {
            die( print_r( sqlsrv_errors(SQLSRV_ERR_ALL), true));
            return false;
        }
        return true;
    }
}
?>