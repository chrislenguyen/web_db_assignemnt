var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

var inpatientList;
var outpatientList;
var patient;

function setUp() {
    activeReportNav();
    clearForm();
}


function clearForm() {
    clearPatientList();
    closeTreatmentList();
    closeExamList();
    search();
}


function activeReportNav() {
    var searchBar = document.getElementById("report");
    searchBar.classList.add("active");
}

function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
            getInpatientTreatment(this.parentNode.id);
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
            getOutpatientExamination(this.parentNode.id);
        };
        view.appendChild(viewButton);
        }
    }
    document.getElementById("patientListForm").style.display = "block";
}


function showInpatientTreatment() {
    document.getElementById("treatmentpId").value = patient[0].pId; 
    document.getElementById("treatmentfName").value = patient[0].fName; 
    document.getElementById("treatmentlName").value = patient[0].lName; 


    var tableBody = document.getElementById("treatmentListInfo");
    var lastId = 0;
    var lastAId = 0;

    for (var index in patient) {
        if (patient[index].tId != lastId) {
            // lastAId = 0;
            lastId = patient[index].tId;
        
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
            adDate_text.setAttribute("rows", "3");
            adDate_text.setAttribute("cols", "8");
            if (lastAId != patient[index].aId) {
                var date = new Date(Date.parse(patient[index].adDate.date));
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
            disDate_text.setAttribute("rows", "3");
            disDate_text.setAttribute("cols", "8");
            if (lastAId != patient[index].aId) {
                var date = "Not yet";
                if (patient[index].disDate != null) {
                    date = new Date(Date.parse(patient[index].disDate.date)).toDateString();
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
            var fee = newRow.insertCell(2);
            var fee_text = document.createElement("textarea");
            fee_text.setAttribute("readOnly", "true");
            fee_text.setAttribute("class", "form-control text-dark text-center");
            fee_text.setAttribute("aria-lable", "With textarea");
            fee_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            fee_text.setAttribute("rows", "3");
            fee_text.setAttribute("cols", "15");
            if (lastAId != patient[index].aId) {
                fee_text.defaultValue = currencyFormat(patient[index].fee);
            } else {
                fee_text.defaultValue = "_";
            }
            fee.appendChild(fee_text);


            // Insert a cell in the row
            var start = newRow.insertCell(3);
            var start_text = document.createElement("textarea");
            start_text.setAttribute("readOnly", "true");
            start_text.setAttribute("class", "form-control text-dark text-center");
            start_text.setAttribute("aria-lable", "With textarea");
            start_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            start_text.setAttribute("rows", "3");
            start_text.setAttribute("cols", "8");
            var date = new Date(Date.parse(patient[index].start.date));
            start_text.defaultValue = date.toDateString();
            start.appendChild(start_text);


            // Insert a cell in the row
            var end = newRow.insertCell(4);
            var end_text = document.createElement("textarea");
            end_text.setAttribute("readOnly", "true");
            end_text.setAttribute("class", "form-control text-dark text-center");
            end_text.setAttribute("aria-lable", "With textarea");
            end_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            end_text.setAttribute("rows", "3");
            end_text.setAttribute("cols", "8");
            end_text.defaultValue = new Date(Date.parse(patient[index].end.date)).toDateString();
            end.appendChild(end_text);


            // Insert a cell in the row
            var result = newRow.insertCell(5);
            var result_text = document.createElement("textarea");
            result_text.setAttribute("readOnly", "true");
            result_text.setAttribute("class", "form-control text-dark");
            result_text.setAttribute("aria-lable", "With textarea");
            result_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            result_text.setAttribute("rows", "3");
            result_text.setAttribute("cols", "15");
            result_text.defaultValue = patient[index].result;
            result.appendChild(result_text);


            // Insert a cell in the row
            var doctor = newRow.insertCell(6);
            var doctor_text = document.createElement("textarea");
            doctor_text.setAttribute("readOnly", "true");
            doctor_text.setAttribute("class", "form-control text-dark text-center");
            doctor_text.setAttribute("aria-lable", "With textarea");
            doctor_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            doctor_text.setAttribute("rows", "3");
            doctor_text.setAttribute("cols", "15");
            doctor_text.defaultValue = patient[index].doctor;
            doctor.appendChild(doctor_text);

            //Insert a cell in the row
            var view = newRow.insertCell(7);
            view.setAttribute("style", "width:10px; text-align: center;");
            view.setAttribute("id", index);
            var viewButton = document.createElement("button");
            viewButton.setAttribute("type", "button");
            viewButton.setAttribute("class", "form-control btn btn-light fa fa-info");
            viewButton.onclick = function () {
                viewTreatment(this.parentNode.id);
            };
            view.appendChild(viewButton);

            if (lastAId != patient[index].aId) {
                lastAId = patient[index].aId;
            }
        }
    }
    document.getElementById("treatmentListForm").style.display = "block";
}

function showOutpatientTreatment() {
    document.getElementById("exampId").value = patient[0].pId; 
    document.getElementById("examfName").value = patient[0].fName; 
    document.getElementById("examlName").value = patient[0].lName; 


    var tableBody = document.getElementById("examListInfo");
    var lastId = 0;

    for (var index in patient) {
        if (patient[index].eId != lastId) {
            lastId = patient[index].eId;
        
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
            exDate_text.setAttribute("rows", "1");
            exDate_text.setAttribute("cols", "8");
            var date = new Date(Date.parse(patient[index].exDate.date));
            exDate_text.defaultValue = date.toDateString();
            exDate.appendChild(exDate_text);


            // Insert a cell in the row
            var secondDate = newRow.insertCell(1);
            var secondDate_text = document.createElement("textarea");
            secondDate_text.setAttribute("readOnly", "true");
            secondDate_text.setAttribute("class", "form-control text-dark text-center");
            secondDate_text.setAttribute("aria-lable", "With textarea");
            secondDate_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            secondDate_text.setAttribute("rows", "1");
            secondDate_text.setAttribute("cols", "8");
            secondDate_text.defaultValue = new Date(Date.parse(patient[index].secondDate.date)).toDateString();
            secondDate.appendChild(secondDate_text);


            // Insert a cell in the row
            var diagnosis = newRow.insertCell(2);
            var diagnosis_text = document.createElement("textarea");
            diagnosis_text.setAttribute("readOnly", "true");
            diagnosis_text.setAttribute("class", "form-control text-dark text-center");
            diagnosis_text.setAttribute("aria-lable", "With textarea");
            diagnosis_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            diagnosis_text.setAttribute("rows", "1");
            diagnosis_text.setAttribute("cols", "15");
            diagnosis_text.defaultValue = patient[index].diagnosis;
            diagnosis.appendChild(diagnosis_text);


            // Insert a cell in the row
            var doctor = newRow.insertCell(3);
            var doctor_text = document.createElement("textarea");
            doctor_text.setAttribute("readOnly", "true");
            doctor_text.setAttribute("class", "form-control text-dark text-center");
            doctor_text.setAttribute("aria-lable", "With textarea");
            doctor_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            doctor_text.setAttribute("rows", "1");
            doctor_text.setAttribute("cols", "15");
            doctor_text.defaultValue = patient[index].doctor;
            doctor.appendChild(doctor_text);

            //Insert a cell in the row
            var view = newRow.insertCell(4);
            view.setAttribute("style", "width:10px; text-align: center;");
            view.setAttribute("id", index);
            var viewButton = document.createElement("button");
            viewButton.setAttribute("type", "button");
            viewButton.setAttribute("class", "form-control btn btn-light fa fa-info");
            viewButton.onclick = function () {
                viewExamination(this.parentNode.id);
            };
            view.appendChild(viewButton);
        }
    }
    document.getElementById("examListForm").style.display = "block";
}


function viewTreatment(index) {
    var total = 0;

    document.getElementById("inpatientId").value = patient[0].pId; 
    document.getElementById("inFName").value = patient[0].fName; 
    document.getElementById("inLName").value = patient[0].lName; 
    document.getElementById("inPhone").value = patient[0].phone; 
    document.getElementById("inAddr").value = patient[0].addr; 
    document.getElementById("inResult").value = patient[0].result; 
    document.getElementById("inDoctor").value = patient[0].doctor; 
    if (patient[0].gender == "m") {
        document.getElementById("inGender").value = "Male"; 
    } else {
        document.getElementById("inGender").value = "Female"; 
    }
    document.getElementById("inDob").value = new Date(Date.parse(patient[0].dob.date)).toDateString(); 
    document.getElementById("inStart").value = new Date(Date.parse(patient[0].start.date)).toDateString(); 
    document.getElementById("inEnd").value = new Date(Date.parse(patient[0].start.date)).toDateString(); 
    document.getElementById("inToday").value = new Date().toDateString(); 

    var tableBody = document.getElementById("inpatientInfo");

    for (var i = index; i < patient.length; i++) {
        if (patient[index].tId != patient[i].tId) {
            break;
        }
        // Insert a row at the end of the table
        var newRow = tableBody.insertRow(-1);
        // newRow.setAttribute("class", "text-center");

        // Insert a cell in the row
        var drug = newRow.insertCell(0);
        var drug_text = document.createElement("textarea");
        drug_text.setAttribute("readOnly", "true");
        drug_text.setAttribute("class", "form-control text-dark text-center");
        drug_text.setAttribute("aria-lable", "With textarea");
        drug_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        drug_text.setAttribute("rows", "1");
        drug_text.setAttribute("cols", "20");
        drug_text.defaultValue = patient[i].drug;
        drug.appendChild(drug_text);


        // Insert a cell in the row
        var amount = newRow.insertCell(1);
        var amount_text = document.createElement("textarea");
        amount_text.setAttribute("readOnly", "true");
        amount_text.setAttribute("class", "form-control text-dark text-center");
        amount_text.setAttribute("aria-lable", "With textarea");
        amount_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        amount_text.setAttribute("rows", "1");
        amount_text.setAttribute("cols", "10");
        amount_text.defaultValue = patient[i].amount;
        amount.appendChild(amount_text);


        // Insert a cell in the row
        var price = newRow.insertCell(2);
        var price_text = document.createElement("textarea");
        price_text.setAttribute("readOnly", "true");
        price_text.setAttribute("class", "form-control text-dark text-center");
        price_text.setAttribute("aria-lable", "With textarea");
        price_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        price_text.setAttribute("rows", "1");
        price_text.setAttribute("cols", "15");
        price_text.defaultValue = currencyFormat(patient[i].price);
        price.appendChild(price_text);

        total = parseFloat(total) + parseFloat(patient[i].price) * parseFloat(patient[i].amount);
    }
    document.getElementById("inTotal").value = currencyFormat(parseFloat(total)); 

    document.getElementById("treatmentListForm").style.display = "none";
    document.getElementById("paymentBtn").style.display = "block";
    document.getElementById("inpatientForm").style.display = "block";
}


function viewExamination(index) {
    var total = 0;

    document.getElementById("outpatientId").value = patient[0].pId; 
    document.getElementById("outFName").value = patient[0].fName; 
    document.getElementById("outLName").value = patient[0].lName; 
    document.getElementById("outPhone").value = patient[0].phone; 
    document.getElementById("outAddr").value = patient[0].addr; 
    document.getElementById("outDiagnosis").value = patient[0].diagnosis; 
    document.getElementById("outDoctor").value = patient[0].doctor; 
    if (patient[0].gender == "m") {
        document.getElementById("outGender").value = "Male"; 
    } else {
        document.getElementById("outGender").value = "Female"; 
    }
    document.getElementById("outDob").value = new Date(Date.parse(patient[0].dob.date)).toDateString(); 
    document.getElementById("outExDate").value = new Date(Date.parse(patient[0].exDate.date)).toDateString(); 
    document.getElementById("outSecondDate").value = new Date(Date.parse(patient[0].secondDate.date)).toDateString(); 
    document.getElementById("outToday").value = new Date().toDateString(); 

    var tableBody = document.getElementById("outpatientInfo");

    for (var i = index; i < patient.length; i++) {
        if (patient[index].eId != patient[i].eId) {
            break;
        }
        // Insert a row at the end of the table
        var newRow = tableBody.insertRow(-1);
        // newRow.setAttribute("class", "text-center");

        // Insert a cell in the row
        var drug = newRow.insertCell(0);
        var drug_text = document.createElement("textarea");
        drug_text.setAttribute("readOnly", "true");
        drug_text.setAttribute("class", "form-control text-dark text-center");
        drug_text.setAttribute("aria-lable", "With textarea");
        drug_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        drug_text.setAttribute("rows", "1");
        drug_text.setAttribute("cols", "20");
        drug_text.defaultValue = patient[i].drug;
        drug.appendChild(drug_text);


        // Insert a cell in the row
        var amount = newRow.insertCell(1);
        var amount_text = document.createElement("textarea");
        amount_text.setAttribute("readOnly", "true");
        amount_text.setAttribute("class", "form-control text-dark text-center");
        amount_text.setAttribute("aria-lable", "With textarea");
        amount_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        amount_text.setAttribute("rows", "1");
        amount_text.setAttribute("cols", "10");
        amount_text.defaultValue = patient[i].amount;
        amount.appendChild(amount_text);


        // Insert a cell in the row
        var price = newRow.insertCell(2);
        var price_text = document.createElement("textarea");
        price_text.setAttribute("readOnly", "true");
        price_text.setAttribute("class", "form-control text-dark text-center");
        price_text.setAttribute("aria-lable", "With textarea");
        price_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
        price_text.setAttribute("rows", "1");
        price_text.setAttribute("cols", "15");
        price_text.defaultValue = currencyFormat(patient[i].price);
        price.appendChild(price_text);

        total = parseFloat(total) + parseFloat(patient[i].price) * parseFloat(patient[i].amount);
    }
    // document.getElementById("outTotal").value = currencyFormat(parseFloat(total)); 
    document.getElementById("outTotal").value = currencyFormat(patient[index].fee);

    document.getElementById("examListForm").style.display = "none";
    document.getElementById("examBtn").style.display = "block";
    document.getElementById("outpatientForm").style.display = "block";
}


function backToTreatmentList() {
    document.getElementById("treatmentListForm").style.display = "block";
    document.getElementById("paymentBtn").style.display = "none";
    clearTreatmentInfo();
}

function clearTreatmentInfo() {
    document.getElementById("inpatientForm").reset();
    document.getElementById("inpatientForm").style.display = "none";
    var tableBody = document.getElementById("inpatientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function closeTreatmentList() {
    clearTreatmentInfo()
    document.getElementById("paymentBtn").style.display = "none";
    document.getElementById("treatmentListForm").style.display = "none";
    var tableBody = document.getElementById("treatmentListInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
    // search();
}



function backToExamList() {
    document.getElementById("examListForm").style.display = "block";
    document.getElementById("examBtn").style.display = "none";
    clearExamInfo();
}

function clearExamInfo() {
    document.getElementById("outpatientForm").reset();
    document.getElementById("outpatientForm").style.display = "none";
    var tableBody = document.getElementById("outpatientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function closeExamList() {
    clearExamInfo()
    document.getElementById("examBtn").style.display = "none";
    document.getElementById("examListForm").style.display = "none";
    var tableBody = document.getElementById("examListInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
    // search();
}

function clearTreatmentInfo() {
    document.getElementById("inpatientForm").reset();
    document.getElementById("inpatientForm").style.display = "none";
    var tableBody = document.getElementById("inpatientInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}

function clearPatientList() {
    document.getElementById("patientListForm").style.display = "none";
    var tableBody = document.getElementById("patientListInfo");
    for (var i = tableBody.rows.length - 1; i >= 0; i--) {
        tableBody.deleteRow(i);
    }
}


function search() {
    patient = "";
    var key = document.getElementById("searchInput").value;
    // var noti = document.getElementById("searching");
    document.getElementById("searching").style.display = "block";
    if (key == "") {
        document.getElementById("searching").innerHTML = "<i class='col col-1 fa fa-spinner'></i>Getting all patients's information! Please wait for a while...";
    } else {
        document.getElementById("searching").innerHTML = "<i class='col col-1 fa fa-spinner'></i>Searching for " + key + " ! Please wait for a while...";
    }

    var dataStr = "function=getPatients&data=" + key;
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("searching").value = "";
            document.getElementById("searching").style.display = "none";
            var result = this.responseText;
            // console.log(result);	
            if (result != false) {
                var data = JSON.parse(result);
                console.log(data);
                inpatientList = data[0];
                outpatientList = data[1];
                showInPatient();
                showOutPatient();
            } else {
                alert("Fail to get patient(s)'s information!")
            }
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}


function getInpatientTreatment(index) {
    patient = "";
    // console.log(inpatientList[index].pId);
    var dataStr = "function=getTreatment&pId=" + inpatientList[index].pId;

    document.getElementById("searching").style.display = "block";
    document.getElementById("searching").innerHTML = "<i class='col col-1 fa fa-spinner'></i>Getting information of " + inpatientList[index].pId + "! Please wait for a while..."

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("searching").value = "";
            document.getElementById("searching").style.display = "none";
            clearTreatmentInfo();
            clearPatientList();
            var result = this.responseText;
            // console.log(result);
            if (result != false) {
                var data = JSON.parse(result);
                console.log(data);
                patient = data;
                // console.log(patient);
                document.getElementById("searchInput").value = "";
                showInpatientTreatment();
            } else {
                alert("Fail to get information of patient...");
                patient = "";
            }
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}


function getOutpatientExamination(index) {
    // console.log(inpatientList[index].pId);
    var dataStr = "function=getExamination&pId=" + outpatientList[index].pId;

    document.getElementById("searching").style.display = "block";
    document.getElementById("searching").innerHTML = "<i class='col col-1 fa fa-spinner'></i>Getting information of " + outpatientList[index].pId + "! Please wait for a while..."

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("searching").value = "";
            document.getElementById("searching").style.display = "none";
            clearTreatmentInfo();
            clearPatientList();
            var result = this.responseText;
            // console.log(result);
            if (result != false) {
                var data = JSON.parse(result);
                console.log(data);
                patient = data;
                // console.log(patient);
                document.getElementById("searchInput").value = "";
                showOutpatientTreatment();
            } else {
                alert("Fail to get information of patient...");
                patient = "";
            }
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}