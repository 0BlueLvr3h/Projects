document.addEventListener("DOMContentLoaded",()=>{


    document.getElementById("submit").addEventListener("click",()=>{
        var cols = document.getElementById("cols").value;
        var rows = document.getElementById("rows").value;

        if(cols > 0 && rows >0){
            createTable(cols,rows);
        }

    })


    function createTable(cols,rows){
        var newTable = document.getElementById("newTable");

        var table = document.createElement("table");
        newTable.innerHTML = "";

        if((newTable.children.length == 0)){
            for(var i = 0; i < rows; i++){
                var tr = document.createElement("tr");
    
                for(var j = 0; j < cols; j++){
                    if(i==0){
                        var th = document.createElement("th");
                        var node = document.createTextNode("Header" + " " + (j + 1));
                        
                        th.appendChild(node);
                        tr.appendChild(th);

                    }else{
                        var td = document.createElement("td");
                        var node = document.createTextNode("Cella" + " " + (j + 1));
        
                        td.appendChild(node);
                        tr.appendChild(td);
                    }
                }
                table.appendChild(tr);
            }
    
            newTable.appendChild(table);
            //table.setAttribute("border","1");
            table.style.margin = "auto";
            table.style.textAlign = "center";
            table.style.border = "1px solid black"
        }
    }
})