var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

var inpatientList;
var outpatientList;

function setUp() {
    activeSearchNav();
    // search("");
}

function activeSearchNav() {
    var search = document.getElementById("search");
    search.classList.add("active");
}

function showInPatient() {
    var tableBody = document.getElementById("patientListInfo");
    var lastId = 0;

    for (var index in inpatientList) {
        if (inpatientList[index].pId != lastId) {
            lastId = inpatientList[index].pId;
        
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
        id_text.defaultValue = inpatientList[index].pId;
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
        fName_text.defaultValue = inpatientList[index].fName;
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
        lName_text.defaultValue = inpatientList[index].lName;
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
        phone_text.defaultValue = inpatientList[index].phone;
        phone.appendChild(phone_text);

        //Insert a cell in the row
        var view = newRow.insertCell(4);
        view.setAttribute("style", "width:10px; text-align: center;");
        view.setAttribute("id", index);
        var viewButton = document.createElement("button");
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("class", "form-control btn btn-light fa fa-user-circle");
        viewButton.onclick = function () {
            viewPatientInfo(this.parentNode.id);
        };
        view.appendChild(viewButton);
        }
    }
    document.getElementById("patientListForm").style.display = "block";
}

function viewPatientInfo(index) {
    // console.log(index);
    // console.log(inpatientList[index].pId);
    var tableBody = document.getElementById("patientInfo");
    
    document.getElementById("patientId").value = inpatientList[index].pId;
    document.getElementById("firstName").value = inpatientList[index].fName;
    document.getElementById("lastName").value = inpatientList[index].lName;
    document.getElementById("phoneNumber").value = inpatientList[index].phone;

    for (var i = Number(index); i < inpatientList.length; i++) {
        if (inpatientList[i].pId == inpatientList[index].pId) {
            // console.log(inpatientList[i].pId);
            // Insert a row at the end of the table
            var newRow = tableBody.insertRow(-1);
            // newRow.setAttribute("class", "text-center");

            // Insert a cell in the row
            var adDate = newRow.insertCell(0);
            var adDate_text = document.createElement("textarea");
            adDate_text.setAttribute("readOnly", "true");
            adDate_text.setAttribute("class", "form-control text-dark text-center");
            adDate_text.setAttribute("aria-lable", "With textarea");
            adDate_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            adDate_text.setAttribute("rows", "2");
            adDate_text.setAttribute("cols", "3");
            var date = new Date(Date.parse(inpatientList[i].adDate.date));
            adDate_text.defaultValue = date.toDateString();
            adDate.appendChild(adDate_text);


            // Insert a cell in the row
            var disDate = newRow.insertCell(1);
            var disDate_text = document.createElement("textarea");
            disDate_text.setAttribute("readOnly", "true");
            disDate_text.setAttribute("class", "form-control text-primary text-center");
            disDate_text.setAttribute("aria-lable", "With textarea");
            disDate_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            disDate_text.setAttribute("rows", "2");
            disDate_text.setAttribute("cols", "3");
            var date = "Not yet";
            if (inpatientList[i].disDate != null) {
                date = new Date(Date.parse(inpatientList[i].disDate.date)).toDateString();
                disDate_text.classList.remove("text-primary");
                disDate_text.classList.add("text-dark");
            } 
            disDate_text.defaultValue = date;
            disDate.appendChild(disDate_text);


            // Insert a cell in the row
            var start = newRow.insertCell(2);
            var start_text = document.createElement("textarea");
            start_text.setAttribute("readOnly", "true");
            start_text.setAttribute("class", "form-control text-dark text-center");
            start_text.setAttribute("aria-lable", "With textarea");
            start_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            start_text.setAttribute("rows", "2");
            start_text.setAttribute("cols", "3");
            var date = new Date(Date.parse(inpatientList[i].start.date));
            start_text.defaultValue = date.toDateString();
            start.appendChild(start_text);


            // Insert a cell in the row
            var end = newRow.insertCell(3);
            var end_text = document.createElement("textarea");
            end_text.setAttribute("readOnly", "true");
            end_text.setAttribute("class", "form-control text-dark text-center");
            end_text.setAttribute("aria-lable", "With textarea");
            end_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            end_text.setAttribute("rows", "2");
            end_text.setAttribute("cols", "3");
            var date = new Date(Date.parse(inpatientList[i].end.date));
            end_text.defaultValue = date.toDateString();
            end.appendChild(end_text);


            // Insert a cell in the row
            var result = newRow.insertCell(4);
            var result_text = document.createElement("textarea");
            result_text.setAttribute("readOnly", "true");
            result_text.setAttribute("class", "form-control text-dark");
            result_text.setAttribute("aria-lable", "With textarea");
            result_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            result_text.setAttribute("rows", "2");
            result_text.setAttribute("cols", "3");
            result_text.defaultValue = inpatientList[i].result;
            result.appendChild(result_text);


            // Insert a cell in the row
            var doctor = newRow.insertCell(5);
            var doctor_text = document.createElement("textarea");
            doctor_text.setAttribute("readOnly", "true");
            doctor_text.setAttribute("class", "form-control text-dark");
            doctor_text.setAttribute("aria-lable", "With textarea");
            doctor_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            doctor_text.setAttribute("rows", "2");
            doctor_text.setAttribute("cols", "4");
            doctor_text.defaultValue = inpatientList[i].doctor;
            doctor.appendChild(doctor_text);
        }
    }
    document.getElementById("patientForm").style.display = "block";
    clearPatientList();
}

function clearPatientList() {
    document.getElementById("patientListForm").style.display = "none";
    var tableBody = document.getElementById("patientListInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function clearPatientInfo() {
    document.getElementById("patientForm").reset();
    document.getElementById("patientForm").style.display = "none";
    var tableBody = document.getElementById("patientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function search(key) {
    clearPatientInfo();
    clearPatientList();
    var dataStr = "function=searchPatient&data=" + key;
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            // console.log(result);	
            // console.log(this.responseText);
            if (result != false) {
                var data = JSON.parse(this.responseText);
                console.log(data);
                inpatientList = data[0];
                showInPatient();
            }
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}