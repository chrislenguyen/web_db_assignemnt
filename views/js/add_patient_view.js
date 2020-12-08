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
    document.getElementById("addInpatientForm").style.display = "block";
    document.getElementById("addOutpatientForm").style.display = "none";
}

function openOutpatientForm() {
    document.getElementById("addOutpatientForm").style.display = "block";
    document.getElementById("addInpatientForm").style.display = "none";
}

function submitInpatienForm() {

}

function submitOutpatienForm() {

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
            name_text.setAttribute("cols", "3");
            name_text.defaultValue = drugName;
            name.appendChild(name_text);

            // Insert a cell in the row
            var effects = newRow.insertCell(2);
            var effects_text = document.createElement("textarea");
            effects_text.setAttribute("readOnly", "true");
            effects_text.setAttribute("class", "form-control text-dark");
            effects_text.setAttribute("aria-lable", "With textarea");
            effects_text.setAttribute("style", "border: none; resize: none; box-shadow: none; background-color: white;");
            effects_text.setAttribute("rows", "1");
            effects_text.setAttribute("cols", "10");
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
            price_text.setAttribute("cols", "5");
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