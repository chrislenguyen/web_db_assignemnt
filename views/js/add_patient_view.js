var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

var drugList;

function setUp() {
    activeAddNav();
    getDrugList();
}

function activeAddNav() {
    var search = document.getElementById("add");
    search.classList.add("active");
}

function openInpatientForm() {
    resetTable();
    document.getElementById("addInpatientForm").style.display = "block";
    document.getElementById("addOutpatientForm").style.display = "none";
    document.getElementById("addOutpatientForm").reset();
}

function openOutpatientForm() {
    resetTable();
    document.getElementById("addOutpatientForm").style.display = "block";
    document.getElementById("addInpatientForm").style.display = "none";
    document.getElementById("addInpatientForm").reset();
}

function submitInpatienForm() {
    var decision = confirm("ARE YOU SURE?");

    if (decision) {
        var fName = document.getElementById("fNameIn").value;
        var lName = document.getElementById("lNameIn").value;
        var dob = new Date(document.getElementById("birthdateIn").value);
        var addr = document.getElementById("addrIn").value;
        var gender = (document.getElementById("genderIn").value == 1) ? "m" : "f";
        var phone = document.getElementById("phoneIn").value;
        var date = new Date(document.getElementById("admissionDate").value);
        var nurseId = Number(document.getElementById("nurseId").value);
        var doctorId = Number(document.getElementById("doctorId").value);
        var room = document.getElementById("room").value;
        var fee = document.getElementById("feeIn").value;
        var diagnosis = document.getElementById("diagnosisIn").value;

        var validatePhone = phone.match(/^\d{10}$/) || phone.match(/^\d{11}$/);
        var validateId = Number.isInteger(nurseId) && Number.isInteger(doctorId);
        var validateFee = !isNaN(parseFloat(Number(fee)));
        var validateDob = (dob < new Date()) ? 1 : 0;
        var validateDate = (date < new Date()) ? 1 : 0;
        // console.log(validateDate);

        if (fName == "" || lName == "" || addr == "" || room == "" || diagnosis == "" || nurseId == "" || doctorId == "" || fee == "") {
            alert("Please fill all the information!");
        }
        else if (validateId && validateFee && validatePhone && validateDob && validateDate) {
            var dataStr = "&fName=" + fName + 
                "&lName=" + lName +
                "&dob=" + dob.getMonth() + "-" + dob.getDate() + "-" + dob.getFullYear() +
                "&addr=" + addr +
                "&gender=" + gender +
                "&phone=" + phone +
                "&date=" + date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() +  
                "&nurseId=" + nurseId + 
                "&doctorId=" + doctorId + 
                "&room=" + room + 
                "&fee=" + fee +
                "&diagnosis=" + diagnosis;
                addInpatient(dataStr);
        } else {
            alert("Please check your information");
        }
    }
}

function submitOutpatienForm() {
    var decision = confirm("ARE YOU SURE?");

    if (decision) {
        var fName = document.getElementById("fNameOut").value;
        var lName = document.getElementById("lNameOut").value;
        var dob = new Date(document.getElementById("birthdateOut").value);
        var addr = document.getElementById("addrOut").value;
        var gender = (document.getElementById("genderOut").value == 1) ? "m" : "f";
        var phone = document.getElementById("phoneOut").value;
        var examDate = new Date(document.getElementById("examDate").value);
        var secondDate = new Date(document.getElementById("secondDate").value);
        var doctorExamId = Number(document.getElementById("doctorExamId").value);
        var fee = document.getElementById("feeOut").value;
        var diagnosis = document.getElementById("diagnosisOut").value;

        var validatePhone = phone.match(/^\d{10}$/) || phone.match(/^\d{11}$/);
        var validateId = Number.isInteger(doctorExamId);
        var validateFee = !isNaN(parseFloat(Number(fee)));
        var validateDob = (dob < new Date()) ? 1 : 0;
        var validateDate = (examDate < new Date() && secondDate < new Date()) ? 1 : 0;
        // console.log(validateDate);
        
        if (validateId && validateFee && validatePhone && validateDob && validateDate) {
            var dataStr = 
                "&fName=" + fName + 
                "&lName=" + lName +
                "&dob=" + dob.getMonth() + "-" + dob.getDate() + "-" + dob.getFullYear() +
                "&addr=" + addr +
                "&gender=" + gender +
                "&phone=" + phone +
                "&examDate=" + examDate.getMonth() + "-" + examDate.getDate() + "-" + examDate.getFullYear() + 
                "&secondDate=" + secondDate.getMonth() + "-" + secondDate.getDate() + "-" + secondDate.getFullYear() +  
                "&doctorId=" + doctorExamId + 
                "&fee=" + fee +
                "&diagnosis=" + diagnosis;
        } else {
            alert("Please check your information");
        }
    }
}

function showDrugList(drugList) {
    var drugSelect = document.getElementById("drugName");

    for (var index in drugList) {
        var option = document.createElement("option");
        option.text = drugList[index].name
        option.id = index;
        drugSelect.add(option);
    }
}

function getDrug() {
    var drugBody = document.getElementById("drugInfo");
    var drug = document.getElementById("drugName");
    var drugAmount = document.getElementById("amount");

	if (drug.options[drug.selectedIndex].value != "" && drugAmount.value != "") {
        if (!isNaN(Number(drugAmount.value))) {
            var index = drug.options[drug.selectedIndex].id;
            var drugCode = drugList[index].code;
            var drugEffects = drugList[index].effects;
            var drugPrice = drugList[index].price;
            var drugName = drug.options[drug.selectedIndex].value;
            
            // Insert a row at the end of the table
            var newRow = drugBody.insertRow(-1);

            // Insert a cell in the row
            var id = newRow.insertCell(0);
            var id_text = document.createElement("textarea");
            id_text.setAttribute("readOnly", "true");
            id_text.setAttribute("class", "form-control text-dark text-center");
            id_text.setAttribute("aria-lable", "With textarea");
            id_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            id_text.setAttribute("rows", "1");
            id_text.setAttribute("cols", "1");
            id_text.defaultValue = drugCode;
            id.appendChild(id_text);


            // Insert a cell in the row
            var name = newRow.insertCell(1);
            var name_text = document.createElement("textarea");
            name_text.setAttribute("readOnly", "true");
            name_text.setAttribute("class", "form-control text-dark text-center");
            name_text.setAttribute("aria-lable", "With textarea");
            name_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            name_text.setAttribute("rows", "1");
            name_text.setAttribute("cols", "2");
            name_text.defaultValue = drugName;
            name.appendChild(name_text);

            // Insert a cell in the row
            var effects = newRow.insertCell(2);
            var effects_text = document.createElement("textarea");
            effects_text.setAttribute("readOnly", "true");
            effects_text.setAttribute("class", "form-control text-dark");
            effects_text.setAttribute("aria-lable", "With textarea");
            effects_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            effects_text.setAttribute("rows", "2");
            effects_text.setAttribute("cols", "11");
            effects_text.defaultValue = drugEffects;
            effects.appendChild(effects_text);


            // Insert a cell in the row
            var price = newRow.insertCell(3);
            var price_text = document.createElement("textarea");
            price_text.setAttribute("readOnly", "true");
            price_text.setAttribute("class", "form-control text-dark text-center");
            price_text.setAttribute("aria-lable", "With textarea");
            price_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            price_text.setAttribute("rows", "1");
            price_text.setAttribute("cols", "2");
            price_text.defaultValue = drugPrice;
            price.appendChild(price_text);


            // Insert a cell in the row
            var amount = newRow.insertCell(4);
            var amount_text = document.createElement("textarea");
            amount_text.setAttribute("readOnly", "true");
            amount_text.setAttribute("class", "form-control text-dark text-center");
            amount_text.setAttribute("aria-lable", "With textarea");
            amount_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            amount_text.setAttribute("rows", "1");
            amount_text.setAttribute("cols", "1");
            amount_text.defaultValue = drugAmount.value;
            amount.appendChild(amount_text);

            // Insert a cell in the row
            var remove = newRow.insertCell(5);
            remove.setAttribute("style", "width:10px; text-align: center;");
            remove.setAttribute("id", drugBody.rows.length);
            var removeButton = document.createElement("button");
            removeButton.setAttribute("type", "button");
            removeButton.setAttribute("class", "form-control btn btn-danger fa fa-trash");
            removeButton.onclick = function () {
                removeDrug(remove.getAttribute("id"));
            };
            remove.appendChild(removeButton);

            document.getElementById("drugForm").style.display = "block";
        }
    }
} 


function removeDrug(id) {
    console.log(id);
	var drugBody = document.getElementById("drugInfo");
	for (var i = drugBody.rows.length - 1; i >= 0; i--) {
        if (drugBody.rows[i].cells[3].id == id) {
            drugBody.deleteRow(i);
            break;
        }
	}
}

function resetTable() {
    var drugBody = document.getElementById("drugInfo");
    document.getElementById("drugForm").style.display = "none";
	for (var i = drugBody.rows.length - 1; i >= 0; i--) {
        drugBody.deleteRow(i);
	}
}

function getDrugList() {
    var request = "function=getDrugList";

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            // console.log(result);
            var data = JSON.parse(result);
            // console.log(data);
            drugList = data;
            showDrugList(drugList);
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
}

function addInpatient(dataStr) {
    var request = "function=addInpatient" + dataStr;

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
            if (result) {
                alert("Add inpatient success");
                document.getElementById("addInpatientForm").reset();
            } else {
                alert("Add inpatient failed");
            }
            // var data = JSON.parse(result);
            // console.log(data);
        }
    }
    ajax.open(method, url + request, asynchronous);
    ajax.send();
}