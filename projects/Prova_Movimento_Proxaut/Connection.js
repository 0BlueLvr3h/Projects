const url = "http://localhost:8080/api/v1/student";
function getRequest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.response);
            console.log(response);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function postRequest(jsonString){
    var obj = JSON.parse(jsonString)
    console.log(typeof obj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(xhttp.response);
            console.log(response);
        }
    };
    
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(obj));

}