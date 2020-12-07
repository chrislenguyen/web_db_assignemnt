var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

function activeSearchNav() {
    var search = document.getElementById("search");
    search.classList.add("active");
}

function search(key) {
    var dataStr = "function=search&data=" + key;
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);	
        }
    };
    ajax.open(method, url + dataStr, asynchronous);
    ajax.send();
}