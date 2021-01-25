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
		// console.log("TEST");
		// console.log(data);
		if (!data || data.name == "") {
			state = LOGOUT;
			userType = 0;
			name = "";
		} else {
			state = LOGIN;
			// console.log("MET" + data.name);
			name = "Welcome, " + data.name + "!";
		}
		toggleTopNavbar(state, name);	
	}
};

function toggleTopNavbar(state, name) {
	var logout = document.getElementById("logout");
	var username = document.getElementById("username");
	if (state == LOGOUT) {
		logout.style.display = "none";
		username.style.display = "none";
		username.innerHTML = "";
	} else {
		logout.style.display = "block";
		username.style.display = "block";
		username.innerHTML = name;
	}
}
