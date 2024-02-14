const url = "http://localhost:8080/api/v1/order";


function getRequestOrder() {
    return new Promise(function(resolve,reject){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                try{
                    resolve(JSON.parse(xhttp.response));
                }catch(err){
                    reject({
                        status: this.status,
                        err : err
                    })
                }
                
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}




function postRequestOrder(jsonString){
    return new Promise(function(resolve,reject){
        var obj = JSON.parse(jsonString);
        console.log(typeof obj);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                try{
                    resolve(xhttp.response);
                }catch(err){
                    reject({
                        status: this.status,
                        err : err
                    })
                }
            }
        };
        
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(obj));
    });
    
}

function putRequestOrder(newOrder,oldOrderId){
    var obj = JSON.parse(newOrder);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.response);
        }
    };
    
    xhttp.open("PUT", url+"/"+  oldOrderId, true);
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