const url = "http://localhost:8080/api/v1/order";

function getRequestOrder() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try{
                var response = JSON.parse(xhttp.response);
            }catch(err){
                console.log(err);
            }
            console.log(response);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function postRequestOrder(jsonString){
    var obj = JSON.parse(jsonString)
    console.log(typeof obj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.response);
        }
    };
    
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(obj));

}

function putRequestOrder(newOrder,oldOrderId){
    var obj = JSON.parse(newOrder);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.response);
        }
    };
    
    xhttp.open("PUT", url+"/"+oldOrderId, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(obj));
}

function deleteRequestOrder(orderId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.response);
        }
    };
    
    xhttp.open("DELETE", url+"/"+orderId, true);
    xhttp.send();
}