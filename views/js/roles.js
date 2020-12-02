var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/session_ptj.php";
var asynchronous = true;
var userType;
var LOGOUT = 0;
var LOGIN = 1;
var state;
var name;
ajax.open(method, url, asynchronous);
ajax.send();

ajax.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		if (!data) {
			state = LOGOUT;
			userType = 0;
			name = "";
		} else {
			state = LOGIN;
			userType = data.role;
			// name = "Welcome, manager!";
		}
		toggleTopNavbar(state);	
	}
};

function toggleTopNavbar(state) {
	var logout = document.getElementById("logout");
	if (state == LOGOUT) {
		logout.style.display = "none";
	} else {
		logout.style.display = "block";
	}
}
