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
            viewInpatientInfo(this.parentNode.id);
        };
        view.appendChild(viewButton);
        }
    }
    document.getElementById("patientListForm").style.display = "block";
}

function showOutPatient() {
    var tableBody = document.getElementById("patientListInfo");
    var lastId = 0;

    for (var index in outpatientList) {
        if (outpatientList[index].pId != lastId) {
            lastId = outpatientList[index].pId;
        
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
        id_text.defaultValue = outpatientList[index].pId;
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
        fName_text.defaultValue = outpatientList[index].fName;
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
        lName_text.defaultValue = outpatientList[index].lName;
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
        phone_text.defaultValue = outpatientList[index].phone;
        phone.appendChild(phone_text);

        //Insert a cell in the row
        var view = newRow.insertCell(4);
        view.setAttribute("style", "width:10px; text-align: center;");
        view.setAttribute("id", index);
        var viewButton = document.createElement("button");
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("class", "form-control btn btn-light fa fa-user-circle");
        viewButton.onclick = function () {
            viewOutpatientInfo(this.parentNode.id);
        };
        view.appendChild(viewButton);
        }
    }
    document.getElementById("patientListForm").style.display = "block";
}


function viewInpatientInfo(index) {
    // console.log(index);
    // console.log(inpatientList[index].pId);
    var tableBody = document.getElementById("inpatientInfo");
    var lastId = 0;
    
    document.getElementById("inpatientId").value = inpatientList[index].pId;
    document.getElementById("infirstName").value = inpatientList[index].fName;
    document.getElementById("inlastName").value = inpatientList[index].lName;
    document.getElementById("inphoneNumber").value = inpatientList[index].phone;

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
            if (lastId != inpatientList[i].aId) {
                var date = new Date(Date.parse(inpatientList[i].adDate.date));
                adDate_text.defaultValue = date.toDateString();
            } else {
                adDate_text.defaultValue = "_";
            }
            adDate.appendChild(adDate_text);


            // Insert a cell in the row
            var disDate = newRow.insertCell(1);
            var disDate_text = document.createElement("textarea");
            disDate_text.setAttribute("readOnly", "true");
            disDate_text.setAttribute("class", "form-control text-dark text-center");
            disDate_text.setAttribute("aria-lable", "With textarea");
            disDate_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            disDate_text.setAttribute("rows", "2");
            disDate_text.setAttribute("cols", "3");
            if (lastId != inpatientList[i].aId) {
                var date = "Not yet";
                if (inpatientList[i].disDate != null) {
                    date = new Date(Date.parse(inpatientList[i].disDate.date)).toDateString();
                } else {
                    disDate_text.classList.remove("text-dark");
                    disDate_text.classList.add("text-primary");
                }
                disDate_text.defaultValue = date;
            } else {
                disDate_text.defaultValue = "_";
            }
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
            doctor_text.setAttribute("class", "form-control text-dark text-center");
            doctor_text.setAttribute("aria-lable", "With textarea");
            doctor_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            doctor_text.setAttribute("rows", "2");
            doctor_text.setAttribute("cols", "3");
            doctor_text.defaultValue = inpatientList[i].doctor;
            doctor.appendChild(doctor_text);


            // Insert a cell in the row
            var nurse = newRow.insertCell(6);
            var nurse_text = document.createElement("textarea");
            nurse_text.setAttribute("readOnly", "true");
            nurse_text.setAttribute("class", "form-control text-dark text-center");
            nurse_text.setAttribute("aria-lable", "With textarea");
            nurse_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            nurse_text.setAttribute("rows", "2");
            nurse_text.setAttribute("cols", "3");
            nurse_text.defaultValue = inpatientList[i].nurse;
            nurse.appendChild(nurse_text);

            if (lastId != inpatientList[i].aId) {
                lastId = inpatientList[i].aId;
            }
            // break;
        }
    }
    document.getElementById("inpatientForm").style.display = "block";
    clearPatientList();
}


function viewOutpatientInfo(index) {
    // console.log(index);
    // console.log(inpatientList[index].pId);
    var tableBody = document.getElementById("outpatientInfo");
    
    document.getElementById("outpatientId").value = outpatientList[index].pId;
    document.getElementById("outfirstName").value = outpatientList[index].fName;
    document.getElementById("outlastName").value = outpatientList[index].lName;
    document.getElementById("outphoneNumber").value = outpatientList[index].phone;

    for (var i = Number(index); i < outpatientList.length; i++) {
        if (outpatientList[i].pId == outpatientList[index].pId) {
            // console.log(inpatientList[i].pId);
            // Insert a row at the end of the table
            var newRow = tableBody.insertRow(-1);
            // newRow.setAttribute("class", "text-center");

            // Insert a cell in the row
            var exDate = newRow.insertCell(0);
            var exDate_text = document.createElement("textarea");
            exDate_text.setAttribute("readOnly", "true");
            exDate_text.setAttribute("class", "form-control text-dark text-center");
            exDate_text.setAttribute("aria-lable", "With textarea");
            exDate_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            exDate_text.setAttribute("rows", "2");
            exDate_text.setAttribute("cols", "2");
            var date = new Date(Date.parse(outpatientList[i].exDate.date));
            exDate_text.defaultValue = date.toDateString();
            exDate.appendChild(exDate_text);


            // Insert a cell in the row
            var seconDate = newRow.insertCell(1);
            var seconDate_text = document.createElement("textarea");
            seconDate_text.setAttribute("readOnly", "true");
            seconDate_text.setAttribute("class", "form-control text-center");
            seconDate_text.setAttribute("aria-lable", "With textarea");
            seconDate_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            seconDate_text.setAttribute("rows", "2");
            seconDate_text.setAttribute("cols", "2");
            var date = new Date(Date.parse(outpatientList[i].secondDate.date));
            seconDate_text.defaultValue = date.toDateString();
            seconDate.appendChild(seconDate_text);


            // Insert a cell in the row
            var diagnosis = newRow.insertCell(2);
            var diagnosis_text = document.createElement("textarea");
            diagnosis_text.setAttribute("readOnly", "true");
            diagnosis_text.setAttribute("class", "form-control text-dark text-center");
            diagnosis_text.setAttribute("aria-lable", "With textarea");
            diagnosis_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            diagnosis_text.setAttribute("rows", "2");
            diagnosis_text.setAttribute("cols", "2");
            diagnosis_text.defaultValue = outpatientList[i].diagnosis;
            diagnosis.appendChild(diagnosis_text);


            // Insert a cell in the row
            var doctor = newRow.insertCell(3);
            var doctor_text = document.createElement("textarea");
            doctor_text.setAttribute("readOnly", "true");
            doctor_text.setAttribute("class", "form-control text-dark text-center");
            doctor_text.setAttribute("aria-lable", "With textarea");
            doctor_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            doctor_text.setAttribute("rows", "2");
            doctor_text.setAttribute("cols", "2");
            doctor_text.defaultValue = outpatientList[i].doctor;
            doctor.appendChild(doctor_text);
        }
    }
    document.getElementById("outpatientForm").style.display = "block";
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
    document.getElementById("inpatientForm").reset();
    document.getElementById("inpatientForm").style.display = "none";
    var tableBody = document.getElementById("inpatientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
    document.getElementById("outpatientForm").reset();
    document.getElementById("outpatientForm").style.display = "none";
    var tableBody = document.getElementById("outpatientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function search() {
    var key = document.getElementById("searchInput").value;
    clearPatientInfo();
    clearPatientList();
    // console.log(key);
    if (key != "") {
        document.getElementById("searching").innerHTML = "<i class='col col-1 fa fa-spinner'></i>Searching for " + key + "! Please wait for a while";
        document.getElementById("searching").style.display = "block";
    } else {
        document.getElementById("searching").innerHTML = "";
        document.getElementById("searching").style.display = "none";
    }


    var dataStr = "function=searchPatients&data=" + key;
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("searching").innerHTML = "";
            document.getElementById("searching").style.display = "none";
            var result = this.responseText;
            // console.log(result);	
            // console.log(this.responseText);
            if (result != false) {
                var data = JSON.parse(this.responseText);
                console.log(data);
                inpatientList = data[0];
                outpatientList = data[1];
                showInPatient();
                showOutPatient();
            }
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}