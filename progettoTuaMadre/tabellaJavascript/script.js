document.addEventListener("DOMContentLoaded",()=>{


    document.getElementById("submit").addEventListener("click",()=>{
        var cols = document.getElementById("cols").value;
        var rows = document.getElementById("rows").value;
        var content = document.getElementById("content").value;
        createTable(cols,rows,content);
    })


    function createTable(cols,rows,content){
        var newTable = document.getElementById("newTable");

        var table = document.createElement("table");
        newTable.innerHTML = "";

        if((newTable.children.length == 0)){
            for(var i = 0; i < rows; i++){
                var tr = document.createElement("tr");
    
                for(var j = 0; j < cols; j++){
                    var td = document.createElement("td");
                    var node = document.createTextNode(content);
    
                    td.appendChild(node);
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
    
            newTable.appendChild(table);
            table.setAttribute("border","1");
            
            console.log(newTable);
        }
        

    }

})