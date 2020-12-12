var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_controller.php?";
var asynchronous = true;

var totalFee = 0;

function setUp() {
    activeSearchNav();
    getDoctorList();
}

function activeSearchNav() {
    var search = document.getElementById("doctor");
    search.classList.add("active");
}

function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}


function createInpatientInfoForm(patientList) {
    console.log(patientList);
    totalFee = Number(0);
    // var form = document.getElementById("main").children[3];
    var form = document.getElementById("inpatientForm");
    // console.log(document.getElementById("main").children.length)// + form.id);
    var newForm = form.cloneNode(true);
    var lastId = 0;
    var adId = 0;
    var tId = 0;
    var newTable = 0;
    var newTreatment = 0;

    for (var index in patientList) {
        if (lastId != patientList[index].pId) {
            adId = 0;
            tId = 0;
            lastId = patientList[index].pId;

            newForm = form.cloneNode(true);
            children = newForm.children;
            newTable = children[3].cloneNode(true);

            var patientInfo = children[2].children;
            // console.log(patientInfo.length);

            patientInfo[0].children[1].value = patientList[index].pId;
            if (patientList[index].gender == "f") {
                patientInfo[0].children[4].value = "Female";
            } else {
                patientInfo[0].children[4].value = "Male";
            }
            
            patientInfo[1].children[1].value = patientList[index].fName.trim();
            patientInfo[1].children[4].value = patientList[index].lName.trim();

            patientInfo[2].children[1].value = patientList[index].phone;
            patientInfo[2].children[4].value = new Date(patientList[index].dob.date).toDateString();

            patientInfo[3].children[1].value = patientList[index].addr.trim();  

            newForm.removeAttribute("id");
            newForm.style.display = "block";
            document.getElementById("main").appendChild(document.createElement("br"));
            document.getElementById("main").appendChild(newForm);
        }
        // console.log(adId, patientList[index].adId);
        if (adId != patientList[index].adId) {
            tId = 0;
            adId = patientList[index].adId;
            newTable = children[3].cloneNode(true);
            showAdmission(newTable.children, patientList, index);

            newTable.removeAttribute("id");
            newTable.style.display = "block";
            newForm.appendChild(newTable);
        }
        if (tId != patientList[index].tId) {
            tId = patientList[index].tId;
            newTreatment = newTable.children[1].cloneNode(true);
            showTreatment(newTreatment, patientList, index);

            newTreatment.removeAttribute("id");
            newTreatment.style.display = "block";
            newTable.appendChild(newTreatment);
        }
        showTreatmentDrug(newTreatment, patientList, index);
    }
}


function showTreatment(table, patientList, index) {
    var treatmentTable = table.children[0];
    
    var newRow = treatmentTable.insertRow(-1);

    //**********************************Insert a cell in the row**********************************//
    var start = newRow.insertCell(0);
    var start_text = document.createElement("textarea");
    start_text.setAttribute("readOnly", "true");
    start_text.setAttribute("class", "form-control text-dark text-center");
    start_text.setAttribute("aria-lable", "With textarea");
    start_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    start_text.setAttribute("rows", "1");
    start_text.setAttribute("cols", "2");
    start_text.defaultValue = new Date(Date.parse(patientList[index].start.date)).toDateString();
    start.appendChild(start_text);

    //**********************************Insert a cell in the row**********************************//
    var end = newRow.insertCell(1);
    var end_text = document.createElement("textarea");
    end_text.setAttribute("readOnly", "true");
    end_text.setAttribute("class", "form-control text-dark text-center");
    end_text.setAttribute("aria-lable", "With textarea");
    end_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    end_text.setAttribute("rows", "1");
    end_text.setAttribute("cols", "2");
    end_text.defaultValue = new Date(Date.parse(patientList[index].end.date)).toDateString();
    end.appendChild(end_text);

    //**********************************Insert a cell in the row**********************************//
    var result = newRow.insertCell(2);
    var result_text = document.createElement("textarea");
    result_text.setAttribute("readOnly", "true");
    result_text.setAttribute("class", "form-control text-dark text-center");
    result_text.setAttribute("aria-lable", "With textarea");
    result_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    result_text.setAttribute("rows", "1");
    result_text.setAttribute("cols", "8");
    result_text.defaultValue = patientList[index].result;
    result.appendChild(result_text);
}


function showTreatmentDrug(table, patientList, index) {
    var drugTable = table.children[1];
    
    var newRow = drugTable.insertRow(-1);

    //**********************************Insert a cell in the row**********************************//
    var drug = newRow.insertCell(0);
    var drug_text = document.createElement("textarea");
    drug_text.setAttribute("readOnly", "true");
    drug_text.setAttribute("class", "form-control text-dark text-center");
    drug_text.setAttribute("aria-lable", "With textarea");
    drug_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    drug_text.setAttribute("rows", "1");
    drug_text.setAttribute("cols", "2");
    drug_text.defaultValue = patientList[index].drug.trim();
    drug.appendChild(drug_text);

    //**********************************Insert a cell in the row**********************************//
    var amount = newRow.insertCell(1);
    var amount_text = document.createElement("textarea");
    amount_text.setAttribute("readOnly", "true");
    amount_text.setAttribute("class", "form-control text-dark text-center");
    amount_text.setAttribute("aria-lable", "With textarea");
    amount_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    amount_text.setAttribute("rows", "1");
    amount_text.setAttribute("cols", "2");
    amount_text.defaultValue = patientList[index].amount;
    amount.appendChild(amount_text);

    //**********************************Insert a cell in the row**********************************//
    var price = newRow.insertCell(2);
    var price_text = document.createElement("textarea");
    price_text.setAttribute("readOnly", "true");
    price_text.setAttribute("class", "form-control text-dark text-center");
    price_text.setAttribute("aria-lable", "With textarea");
    price_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    price_text.setAttribute("rows", "1");
    price_text.setAttribute("cols", "8");
    price_text.defaultValue = currencyFormat(patientList[index].price);
    price.appendChild(price_text);

    //**********************************Insert a cell in the row**********************************//
    var expire = newRow.insertCell(3);
    var expire_text = document.createElement("textarea");
    expire_text.setAttribute("readOnly", "true");
    expire_text.setAttribute("class", "form-control text-dark text-center");
    expire_text.setAttribute("aria-lable", "With textarea");
    expire_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    expire_text.setAttribute("rows", "1");
    expire_text.setAttribute("cols", "2");
    var date = new Date(Date.parse(patientList[index].exDate.date));
    expire_text.defaultValue = date.toDateString();
    expire.appendChild(expire_text);
}


function showAdmission(table, patientList, index) {
    var adInfo = table[0];
    // console.log(adInfo.children.length);
    adInfo.children[1].value = new Date(patientList[index].adDate.date).toDateString();
    if (patientList[index].disDate == null) {
        adInfo.children[4].value = "Not yet";
        adInfo.children[4].classList.remove("text-dark");
        adInfo.children[4].classList.add("text-primary");
    } else {
        adInfo.children[4].value = new Date(patientList[index].disDate.date).toDateString();
    }
}


function createOutpatientInfoForm(patientList) {
    totalFee = Number(0);
    var form = document.getElementById("outpatientForm");
    var newForm = form.cloneNode(true);
    var lastId = 0;
    var examId = 0;
    var newTable = 0;

    for (var index in patientList) {
        if (lastId != patientList[index].pId) {
            examId = 0;
            lastId = patientList[index].pId;

            newForm = form.cloneNode(true);
            children = newForm.children;
            newTable = children[3].cloneNode(true);

            var patientInfo = children[2].children;

            patientInfo[0].children[1].value = patientList[index].pId;
            if (patientList[index].gender == "f") {
                patientInfo[0].children[4].value = "Female";
            } else {
                patientInfo[0].children[4].value = "Male";
            }
            
            patientInfo[1].children[1].value = patientList[index].fName;
            patientInfo[1].children[4].value = patientList[index].lName;

            patientInfo[2].children[1].value = patientList[index].phone;
            patientInfo[2].children[4].value = new Date(patientList[index].dob.date).toDateString();

            patientInfo[3].children[1].value = patientList[index].addr;  

            newForm.removeAttribute("id");
            newForm.style.display = "block";
            document.getElementById("main").appendChild(document.createElement("br"));
            document.getElementById("main").appendChild(newForm);
        }
        if (examId != patientList[index].examId) {
            examId = patientList[index].examId;
            newTable = children[3].cloneNode(true);
            var examFee = showExamination(newTable.children, patientList, index);
        }
        var drugFee = showExamDrug(newTable.children, patientList, index);

        // var fee = children[2].children[4].children[1];

        // var totalFee = Number(fee.value) + Number(examFee) + Number(drugFee);
        // console.log(totalFee);
        // fee.value = totalFee;

        newTable.removeAttribute("id");
        newTable.style.display = "block";
        newForm.appendChild(newTable);
    }
    // if (patientList.length > 0) {
        // showTotalFee(newForm, totalFee);
        // totalFee = Number(0);
    // }
}


function showExamination(table, patientList, index) {
    var examTable = table[0].children;
    
    var newRow = examTable[1].insertRow(-1);

    //**********************************Insert a cell in the row**********************************//
    var exam = newRow.insertCell(0);
    var exam_text = document.createElement("textarea");
    exam_text.setAttribute("readOnly", "true");
    exam_text.setAttribute("class", "form-control text-dark text-center");
    exam_text.setAttribute("aria-lable", "With textarea");
    exam_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    exam_text.setAttribute("rows", "1");
    exam_text.setAttribute("cols", "2");
    var date = new Date(Date.parse(patientList[index].examDate.date));
    exam_text.defaultValue = date.toDateString();
    exam.appendChild(exam_text);

    //**********************************Insert a cell in the row**********************************//
    var second = newRow.insertCell(1);
    var second_text = document.createElement("textarea");
    second_text.setAttribute("readOnly", "true");
    second_text.setAttribute("class", "form-control text-dark text-center");
    second_text.setAttribute("aria-lable", "With textarea");
    second_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    second_text.setAttribute("rows", "1");
    second_text.setAttribute("cols", "2");
    var date = new Date(Date.parse(patientList[index].secondDate.date));
    second_text.defaultValue = date.toDateString();
    second.appendChild(second_text);

    //**********************************Insert a cell in the row**********************************//
    var diagnosis = newRow.insertCell(2);
    var diagnosis_text = document.createElement("textarea");
    diagnosis_text.setAttribute("readOnly", "true");
    diagnosis_text.setAttribute("class", "form-control text-dark ");
    diagnosis_text.setAttribute("aria-lable", "With textarea");
    diagnosis_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    diagnosis_text.setAttribute("rows", "1");
    diagnosis_text.setAttribute("cols", "8");
    diagnosis_text.defaultValue = patientList[index].diagnosis;
    diagnosis.appendChild(diagnosis_text);

    //**********************************Insert a cell in the row**********************************//
    var fee = newRow.insertCell(3);
    var fee_text = document.createElement("textarea");
    fee_text.setAttribute("readOnly", "true");
    fee_text.setAttribute("class", "form-control text-dark text-center");
    fee_text.setAttribute("aria-lable", "With textarea");
    fee_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    fee_text.setAttribute("rows", "1");
    fee_text.setAttribute("cols", "2");
    fee_text.defaultValue = currencyFormat(patientList[index].fee);
    fee.appendChild(fee_text);  

    return Number(patientList[index].fee);
}


function showExamDrug(table, patientList, index) {
    var drugTable = table[1].children;
    
    var newRow = drugTable[1].insertRow(-1);

    //**********************************Insert a cell in the row**********************************//
    var drug = newRow.insertCell(0);
    var drug_text = document.createElement("textarea");
    drug_text.setAttribute("readOnly", "true");
    drug_text.setAttribute("class", "form-control text-dark text-center");
    drug_text.setAttribute("aria-lable", "With textarea");
    drug_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    drug_text.setAttribute("rows", "1");
    drug_text.setAttribute("cols", "2");
    drug_text.defaultValue = patientList[index].drug;
    drug.appendChild(drug_text);

    //**********************************Insert a cell in the row**********************************//
    var amount = newRow.insertCell(1);
    var amount_text = document.createElement("textarea");
    amount_text.setAttribute("readOnly", "true");
    amount_text.setAttribute("class", "form-control text-dark text-center");
    amount_text.setAttribute("aria-lable", "With textarea");
    amount_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    amount_text.setAttribute("rows", "1");
    amount_text.setAttribute("cols", "2");
    amount_text.defaultValue = patientList[index].amount;
    amount.appendChild(amount_text);

    //**********************************Insert a cell in the row**********************************//
    var price = newRow.insertCell(2);
    var price_text = document.createElement("textarea");
    price_text.setAttribute("readOnly", "true");
    price_text.setAttribute("class", "form-control text-dark text-center");
    price_text.setAttribute("aria-lable", "With textarea");
    price_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    price_text.setAttribute("rows", "1");
    price_text.setAttribute("cols", "8");
    price_text.defaultValue = currencyFormat(patientList[index].price);
    price.appendChild(price_text);

    //**********************************Insert a cell in the row**********************************//
    var expire = newRow.insertCell(3);
    var expire_text = document.createElement("textarea");
    expire_text.setAttribute("readOnly", "true");
    expire_text.setAttribute("class", "form-control text-dark text-center");
    expire_text.setAttribute("aria-lable", "With textarea");
    expire_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    expire_text.setAttribute("rows", "1");
    expire_text.setAttribute("cols", "2");
    var date = new Date(Date.parse(patientList[index].exDate.date));
    expire_text.defaultValue = date.toDateString();
    expire.appendChild(expire_text);
    
    return Number(patientList[index].amount) * Number(patientList[index].price);
}


function showTotalFee(newForm, totalFee) {
    var fee = document.createElement("div");
    fee.setAttribute("class", "row form-group");

    var info = document.createElement("textarea");
    info.setAttribute("readOnly", "true");
    info.setAttribute("class", "col col-2 form-control text-dark");
    info.setAttribute("aria-lable", "With textarea");
    info.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    info.setAttribute("rows", "1");
    info.defaultValue = "Total fee";

    var fee_text = document.createElement("textarea");
    fee_text.setAttribute("readOnly", "true");
    fee_text.setAttribute("class", "form-control text-dark ");
    fee_text.setAttribute("aria-lable", "With textarea");
    fee_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
    fee_text.setAttribute("rows", "1");
    fee_text.setAttribute("cols", "8");
    fee_text.defaultValue = totalFee;

    fee.appendChild(info);
    fee.appendChild(fee_text);

    newForm.appendChild(fee);
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


function clearPatientDetail() {
    var form = document.getElementById("main").children;
    var length = form.length;
    for (var i = 4; i < length; i++) {
        form[4].remove();
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
    clearPatientDetail();
    // document.getElementById("outpatientForm").reset();
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
                createInpatientInfoForm(data[1]);
                createOutpatientInfoForm(data[0]);
            } else {
                alert("Fail to get patient information!");
            }
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
}