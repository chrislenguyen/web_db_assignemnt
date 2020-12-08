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

function showPatientDetail() {
    console.log("patientList[0].pId");
    var patientBody = document.getElementById("patientDetail");

    // for (var index in patientList) {
    //     console.log(patientList[index].pId);
    //     // Insert a row at the end of the table
    //     var newRow = patientBody.insertRow(-1);

    //     // Insert a cell in the row
    //     var id = newRow.insertCell(0);
    //     var id_text = document.createElement("textarea");
    //     id_text.setAttribute("readOnly", "true");
    //     id_text.setAttribute("class", "form-control text-dark text-center");
    //     id_text.setAttribute("aria-lable", "With textarea");
    //     id_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    //     id_text.setAttribute("rows", "1");
    //     id_text.setAttribute("cols", "1");
    //     id_text.defaultValue = patientList[index].pId;
    //     id.appendChild(id_text);

    //     // Insert a cell in the row
    //     // var name = newRow.insertCell(1);
    //     // var name_text = document.createElement("textarea");
    //     // name_text.setAttribute("readOnly", "true");
    //     // name_text.setAttribute("class", "form-control text-dark text-center");
    //     // name_text.setAttribute("aria-lable", "With textarea");
    //     // name_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    //     // name_text.setAttribute("rows", "1");
    //     // name_text.setAttribute("cols", "2");
    //     // name_text.defaultValue = drugName;
    //     // name.appendChild(name_text);
    // }
    document.getElementById("patientForm").style.display = "block";
}

function clearPatientDetail() {
    document.getElementById("patientForm").style.display = "none";
    var patient = document.getElementById("patientDetail");
    for (var i = patient.rows.length - 1; i >= 0; i--) {
        patient.deleteRow(i);
	}
}

function getDoctorList() {
    request = "function=getDoctor"

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            // console.log(result);
            var data = JSON.parse(result);
            showDoctorList(data);
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
}

function openPatientList() {
    clearPatientDetail();
    var doctorSelect = document.getElementById("doctorList");
    var dId = doctorSelect.options[doctorSelect.selectedIndex].id;

    request = "function=getPatientByDoctor&dId=" + dId;

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
            if (result == true) {
                var data = JSON.parse(result);
                console.log(data);
                // showDoctorList(data);
                showPatientDetail();
            }
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
    // console.log(dId);
}