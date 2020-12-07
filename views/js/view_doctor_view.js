var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

function setUp() {
    activeSearchNav();
    getDoctorList();
}

function activeSearchNav() {
    var search = document.getElementById("doctor");
    search.classList.add("active");
}

function showDoctorList(doctorList) {
    var doctor = document.getElementById("doctorList");

	for (var index in doctorList) {
		var option = document.createElement("option");
		option.text = doctorList[index].fName + " " + doctorList[index].lName;
		option.id = doctorList[index].eId;
		doctor.add(option);
	}
}


function getDoctorList() {
    request = "function=getDoctor"

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
            var data = JSON.parse(result);
            showDoctorList(data);
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
}

function openPatientList() {

}