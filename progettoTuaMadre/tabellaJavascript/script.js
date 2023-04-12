document.addEventListener("DOMContentLoaded",()=>{

    var isColsNot0 = true;
    var isRowNot0 = true;

    document.getElementById("cols").addEventListener("change",()=>{
        if(document.getElementById("cols").value==0){
            !isColsNot0;
            document.getElementById("submit").setAttribute("disabled","");
        }else{
            document.getElementById("submit").removeAttribute("disabled");
        }
    })

    document.getElementById("rows").addEventListener("change",()=>{
        if(document.getElementById("rows").value==0){
            !isRowNot0;
            document.getElementById("submit").setAttribute("disabled","");
        }else{
            document.getElementById("submit").removeAttribute("disabled");
        }
    })


    document.getElementById("submit").addEventListener("click",()=>{
        var cols = document.getElementById("cols").value;
        var rows = document.getElementById("rows").value;

        if(isColsNot0 && isRowNot0){
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
            table.style.margin = "auto";
            table.style.textAlign = "center";
            table.style.border = "1px solid black"
        }
    }
})