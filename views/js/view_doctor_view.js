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

function showPatientDetail(patientList) {
    var patientBody = document.getElementById("patientDetail");

    for (var index in patientList) {
        console.log(patientList[index].pId);
        // Insert a row at the end of the table
        var newRow = patientBody.insertRow(-1);

        // Insert a cell in the row
        var id = newRow.insertCell(0);
        id.rowSpan = 14;
        var id_text = document.createElement("textarea");
        id_text.setAttribute("readOnly", "true");
        id_text.setAttribute("class", "form-control text-dark text-center");
        id_text.setAttribute("aria-lable", "With textarea");
        id_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        id_text.setAttribute("rows", "1");
        id_text.setAttribute("cols", "1");
        id_text.defaultValue = patientList[index].pId;
        id.appendChild(id_text);


        //Insert a cell in the row
        var info = newRow.insertCell(1);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "First name";
        info.appendChild(info_text);


        //Insert a cell in the row
        var fname = newRow.insertCell(2);
        var fname_text = document.createElement("textarea");
        fname_text.setAttribute("readOnly", "true");
        fname_text.setAttribute("class", "form-control text-dark ");
        fname_text.setAttribute("aria-lable", "With textarea");
        fname_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        fname_text.setAttribute("rows", "1");
        fname_text.setAttribute("cols", "8");
        fname_text.defaultValue = patientList[index].fName;
        fname.appendChild(fname_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Last name";
        info.appendChild(info_text);


        //Insert a cell in the row
        var lname = newRow.insertCell(1);
        var lname_text = document.createElement("textarea");
        lname_text.setAttribute("readOnly", "true");
        lname_text.setAttribute("class", "form-control text-dark ");
        lname_text.setAttribute("aria-lable", "With textarea");
        lname_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        lname_text.setAttribute("rows", "1");
        lname_text.setAttribute("cols", "8");
        lname_text.defaultValue = patientList[index].lName;
        lname.appendChild(lname_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Gender";
        info.appendChild(info_text);


        //Insert a cell in the row
        var gender = newRow.insertCell(1);
        var gender_text = document.createElement("textarea");
        gender_text.setAttribute("readOnly", "true");
        gender_text.setAttribute("class", "form-control text-dark ");
        gender_text.setAttribute("aria-lable", "With textarea");
        gender_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        gender_text.setAttribute("rows", "1");
        gender_text.setAttribute("cols", "8");
        if (patientList[index].gender == "m") {
            gender_text.defaultValue = "Male";
        } else {
            gender_text.defaultValue = "Female";
        }
        gender.appendChild(gender_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Phone number";
        info.appendChild(info_text);


        //Insert a cell in the row
        var phone = newRow.insertCell(1);
        var phone_text = document.createElement("textarea");
        phone_text.setAttribute("readOnly", "true");
        phone_text.setAttribute("class", "form-control text-dark ");
        phone_text.setAttribute("aria-lable", "With textarea");
        phone_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        phone_text.setAttribute("rows", "1");
        phone_text.setAttribute("cols", "8");
        phone_text.defaultValue = patientList[index].phone;
        phone.appendChild(phone_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Address";
        info.appendChild(info_text);


        //Insert a cell in the row
        var addr = newRow.insertCell(1);
        var addr_text = document.createElement("textarea");
        addr_text.setAttribute("readOnly", "true");
        addr_text.setAttribute("class", "form-control text-dark ");
        addr_text.setAttribute("aria-lable", "With textarea");
        addr_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        addr_text.setAttribute("rows", "1");
        addr_text.setAttribute("cols", "8");
        addr_text.defaultValue = patientList[index].addr;
        addr.appendChild(addr_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Date of birth";
        info.appendChild(info_text);


        //Insert a cell in the row
        var dob = newRow.insertCell(1);
        var dob_text = document.createElement("textarea");
        dob_text.setAttribute("readOnly", "true");
        dob_text.setAttribute("class", "form-control text-dark ");
        dob_text.setAttribute("aria-lable", "With textarea");
        dob_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        dob_text.setAttribute("rows", "1");
        dob_text.setAttribute("cols", "8");
        var date = new Date(Date.parse(patientList[index].dob.date));
        dob_text.defaultValue = date.toDateString();
        dob.appendChild(dob_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Exam date";
        info.appendChild(info_text);


        //Insert a cell in the row
        var exam = newRow.insertCell(1);
        var exam_text = document.createElement("textarea");
        exam_text.setAttribute("readOnly", "true");
        exam_text.setAttribute("class", "form-control text-dark ");
        exam_text.setAttribute("aria-lable", "With textarea");
        exam_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        exam_text.setAttribute("rows", "1");
        exam_text.setAttribute("cols", "8");
        var date = new Date(Date.parse(patientList[index].examDate.date));
        exam_text.defaultValue = date.toDateString();
        exam.appendChild(exam_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Second exam date";
        info.appendChild(info_text);


        //Insert a cell in the row
        var second = newRow.insertCell(1);
        var second_text = document.createElement("textarea");
        second_text.setAttribute("readOnly", "true");
        second_text.setAttribute("class", "form-control text-dark ");
        second_text.setAttribute("aria-lable", "With textarea");
        second_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        second_text.setAttribute("rows", "1");
        second_text.setAttribute("cols", "8");
        var date = new Date(Date.parse(patientList[index].secondDate.date));
        second_text.defaultValue = date.toDateString();
        second.appendChild(second_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Diagnosis";
        info.appendChild(info_text);


        //Insert a cell in the row
        var diag = newRow.insertCell(1);
        var diag_text = document.createElement("textarea");
        diag_text.setAttribute("readOnly", "true");
        diag_text.setAttribute("class", "form-control text-dark ");
        diag_text.setAttribute("aria-lable", "With textarea");
        diag_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        diag_text.setAttribute("rows", "1");
        diag_text.setAttribute("cols", "8");
        diag_text.defaultValue = patientList[index].diagnosis;
        diag.appendChild(diag_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Fee";
        info.appendChild(info_text);


        //Insert a cell in the row
        var fee = newRow.insertCell(1);
        var fee_text = document.createElement("textarea");
        fee_text.setAttribute("readOnly", "true");
        fee_text.setAttribute("class", "form-control text-dark ");
        fee_text.setAttribute("aria-lable", "With textarea");
        fee_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        fee_text.setAttribute("rows", "1");
        fee_text.setAttribute("cols", "8");
        fee_text.defaultValue = patientList[index].fee;
        fee.appendChild(fee_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Drug name";
        info.appendChild(info_text);


        //Insert a cell in the row
        var drug = newRow.insertCell(1);
        var drug_text = document.createElement("textarea");
        drug_text.setAttribute("readOnly", "true");
        drug_text.setAttribute("class", "form-control text-dark ");
        drug_text.setAttribute("aria-lable", "With textarea");
        drug_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        drug_text.setAttribute("rows", "1");
        drug_text.setAttribute("cols", "8");
        drug_text.defaultValue = patientList[index].name;
        drug.appendChild(drug_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Drug amount";
        info.appendChild(info_text);


        //Insert a cell in the row
        var amount = newRow.insertCell(1);
        var amount_text = document.createElement("textarea");
        amount_text.setAttribute("readOnly", "true");
        amount_text.setAttribute("class", "form-control text-dark ");
        amount_text.setAttribute("aria-lable", "With textarea");
        amount_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        amount_text.setAttribute("rows", "1");
        amount_text.setAttribute("cols", "8");
        amount_text.defaultValue = patientList[index].amount;
        amount.appendChild(amount_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Drug price";
        info.appendChild(info_text);


        //Insert a cell in the row
        var price = newRow.insertCell(1);
        var price_text = document.createElement("textarea");
        price_text.setAttribute("readOnly", "true");
        price_text.setAttribute("class", "form-control text-dark ");
        price_text.setAttribute("aria-lable", "With textarea");
        price_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        price_text.setAttribute("rows", "1");
        price_text.setAttribute("cols", "8");
        price_text.defaultValue = patientList[index].price;
        price.appendChild(price_text);


        ////////////////////////////////////////////////////////////////////////////
        var newRow = patientBody.insertRow(-1);
        //Insert a cell in the row
        var info = newRow.insertCell(0);
        var info_text = document.createElement("textarea");
        info_text.setAttribute("readOnly", "true");
        info_text.setAttribute("class", "form-control text-dark ");
        info_text.setAttribute("aria-lable", "With textarea");
        info_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        info_text.setAttribute("rows", "1");
        info_text.setAttribute("cols", "1");
        info_text.defaultValue = "Drug expiration date";
        info.appendChild(info_text);


        //Insert a cell in the row
        var expire = newRow.insertCell(1);
        var expire_text = document.createElement("textarea");
        expire_text.setAttribute("readOnly", "true");
        expire_text.setAttribute("class", "form-control text-dark");
        expire_text.setAttribute("aria-lable", "With textarea");
        expire_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        expire_text.setAttribute("rows", "1");
        expire_text.setAttribute("cols", "8");
        var date = new Date(Date.parse(patientList[index].exDate.date));
        expire_text.defaultValue = date.toDateString();
        expire.appendChild(expire_text);
    }
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
            // console.log(result);

            if (result == -1) {
                alert("Doctor has no patients!");
            } else if (result != false) {
                var data = JSON.parse(result);
                console.log(data);
                // showDoctorList(data);
                showPatientDetail(data);
            } else {
                alert("Fail to get patient information!");
            }
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
    // console.log(dId);
}