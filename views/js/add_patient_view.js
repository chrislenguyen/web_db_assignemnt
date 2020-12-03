var ajax = new XMLHttpRequest();
var method = "GET";
var url = "controllers/database_ptj.php?";
var asynchronous = true;

function setUp() {
    activeAddNav();
    test();
}

function activeAddNav() {
    var search = document.getElementById("add");
    search.classList.add("active");
}

function test() {
    var request = "function=test";

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
            var data = JSON.parse(result);

        }
    }

    ajax.open(method, url + request, asynchronous);
    ajax.send();
}