var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

var patientList;

function setUp() {
    activeSearchNav();
    search("");
}

function activeSearchNav() {
    var search = document.getElementById("search");
    search.classList.add("active");
}

function showPatient() {
    var tableBody = document.getElementById("patientInfo");

    for (var index in patientList) {
        // Insert a row at the end of the table
        var newRow = tableBody.insertRow(-1);
        // newRow.setAttribute("class", "text-center");

        // Insert a cell in the row
        var id = newRow.insertCell(0);
        var id_text = document.createElement("textarea");
        id_text.setAttribute("readOnly", "true");
        id_text.setAttribute("class", "form-control text-dark text-center");
		id_text.setAttribute("aria-lable", "With textarea");
		id_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
		id_text.setAttribute("rows", "1");
        id_text.setAttribute("cols", "5");
        id_text.defaultValue = patientList[index].pId;
        id.appendChild(id_text);

        // Insert a cell in the row
        var fName = newRow.insertCell(1);
        var fName_text = document.createElement("textarea");
        fName_text.setAttribute("readOnly", "true");
        fName_text.setAttribute("class", "form-control text-dark text-center");
		fName_text.setAttribute("aria-lable", "With textarea");
		fName_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
		fName_text.setAttribute("rows", "1");
        fName_text.setAttribute("cols", "5");
        fName_text.defaultValue = patientList[index].fName;
        fName.appendChild(fName_text);

        // Insert a cell in the row
        var lName = newRow.insertCell(2);
        var lName_text = document.createElement("textarea");
        lName_text.setAttribute("readOnly", "true");
        lName_text.setAttribute("class", "form-control text-dark text-center");
		lName_text.setAttribute("aria-lable", "With textarea");
		lName_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
		lName_text.setAttribute("rows", "1");
        lName_text.setAttribute("cols", "15");
        lName_text.defaultValue = patientList[index].lName;
        lName.appendChild(lName_text);
        
        // Insert a cell in the row
        var phone = newRow.insertCell(3);
        var phone_text = document.createElement("textarea");
        phone_text.setAttribute("readOnly", "true");
        phone_text.setAttribute("class", "form-control text-dark text-center");
		phone_text.setAttribute("aria-lable", "With textarea");
		phone_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
		phone_text.setAttribute("rows", "1");
        phone_text.setAttribute("cols", "10");
        phone_text.defaultValue = patientList[index].phone;
        phone.appendChild(phone_text);

        // Insert a cell in the row
        var view = newRow.insertCell(4);
        view.setAttribute("style", "width:10px; text-align: center;");
        view.setAttribute("id", index);
        var viewButton = document.createElement("button");
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("class", "form-control btn btn-light fa fa-user-circle");
        viewButton.onclick = function () {
            viewPatientInfo(view.getAttribute("id"));
        };
        view.appendChild(viewButton);
    }
    document.getElementById("patientForm").style.display = "block";
}

function viewPatientInfo(index) {
    console.log(patientList[index].pId);
    clearPatientList();
}

function clearPatientList() {
    document.getElementById("patientForm").style.display = "none";
    var tableBody = document.getElementById("patientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function search(key) {
    var dataStr = "function=searchPatient&data=" + key;
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // var data = JSON.parse(this.responseText);
            // console.log(data);	
            console.log(this.responseText);
            if (this.responseText != false) {
                var data = JSON.parse(this.responseText);
                clearPatientList();
                patientList = data;
                showPatient();
            }
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}