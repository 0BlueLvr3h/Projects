document.addEventListener("DOMContentLoaded", () => {


  let nodePath = new Array();
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  

  getRequestOrder()
    .then(
      function (result) {
        let nodeCoordPair = new Array();
        const homeNode = new PathNode(1, 90, 100, false, true);
        const elem = document.getElementById("animate");

        var AGVObj = new AGV(crypto.randomUUID, elem, homeNode);

        nodePath.push(homeNode);
       
        try {
          for (let order of result) {
            let optionEl = document.createElement("option");
            optionEl.textContent = "" + order.orderId;
            optionEl.value = order.orderId;
            document.getElementById("orders").appendChild(optionEl);
          }

          document.getElementById("orders").addEventListener("change", () => {
            let orderDiv = document.getElementById("showOrder");
            orderDiv.innerHTML = "";
            var selectedOrder = document.getElementById("orders").value;
            var nodes;
            var edges;

            for (let order of result) {
              if (order.orderId == selectedOrder) {
                selectedOrder = order;
                nodes = order.nodes;
                edges = order.edges;
              }
            }

            setV(nodes.length);
            document.getElementById("destinationNode").max = nodes.length;
            generateRandomAdjacentMatrix();
            traceConnectedNodes();


            let textArea = document.createElement("textarea");
            let textArea1 = document.createElement("textarea");
            textArea.innerHTML = JSON.stringify(nodes, null, 4);
            textArea1.innerHTML = JSON.stringify(edges, null, 4);
            textArea.readOnly = true;
            textArea.style.width = 350 + "px";
            textArea.style.height = 200 + "px";
            textArea.style.resize = "none";
            textArea1.readOnly = true;
            textArea1.style.width = 350 + "px";
            textArea1.style.height = 200 + "px";
            textArea1.style.resize = "none";
            orderDiv.appendChild(document.createElement("br"));
            orderDiv.appendChild(textArea);
            orderDiv.appendChild(textArea1);

            if (document.getElementById("orders").value == "") {
              orderDiv.innerHTML = "";
            }



            let j = 2;


            nodePath = [];
            nodeCoordPair = [];
            ctx.clearRect(0, 0, c.width, c.height);
            nodePath.push(homeNode);

            nodes.forEach(function (node, i) {
              var index = new String(node.nodeId);
              index = index.split("_")[1];
              nodePath.push(new PathNode(j,
                node.nodePosition.x,
                node.nodePosition.y,
                node.released
              ));
              j++;
            })

            writeNodes(
              nodePath,
              nodeCoordPair,
              AGVObj.graphicElement,
              ctx,
              AGVObj.homePosition
            );

          })

        } catch (err) {
          console.log("Error: no orders in db");
        }


        document.getElementById("delOrder").addEventListener("click",()=>{
          deleteRequestOrder(document.getElementById("orders").value);
          location.reload();
        })

        document.getElementById("updateOrder").addEventListener("click",()=>{
          document.getElementById("overlay").style.display = "block";
            
        })

        document.getElementById("orderButton").addEventListener("click",()=>{
          if(isJsonString(document.getElementById("textarea").value)){
            putRequestOrder(document.getElementById("textarea").value,document.getElementById("orders").value);
            location.reload();
          }
          document.getElementById("overlay").style.display = "none";
        })




        document.getElementById("changeButton").addEventListener("click", () => {
          ctx.clearRect(0, 0, c.width, c.height);
          let newX;
          let newY;
          nodePath = [];
          nodeCoordPair = [];
          nodePath.push(homeNode);

          for (var i = 1; i < V; i++) {
            do {
              newX = Math.floor(Math.random() * 370) + 10;
            } while (isOverlapX(newX, nodePath));

            do {
              newY = Math.floor(Math.random() * 780) - 5;
            } while (isOverlapY(newY, nodePath));

            node = new PathNode(i + 1, newX, newY, true);
            nodePath.push(node);
          }

          writeNodes(
            nodePath,
            nodeCoordPair,
            AGVObj.graphicElement,
            ctx,
            AGVObj.homePosition
          );
        });



        var finalPath = new Array();
        document.getElementById("animation").addEventListener("click", () => {
          
          finalPath = [];
          var homeNodeIndex;
          nodePath.forEach(function (node, i) {
            if (node.isThisNodeHome()) {
              homeNodeIndex = i;
            }
          });
          var finalDestinationNumbers = dijkstra(
            homeNodeIndex - 1,
            document.getElementById("destinationNode").value
          );

          for (var number of finalDestinationNumbers) {
            for (var node of nodePath) {
              if (number == node.getIndex() - 1) {
                if (!finalPath.includes(node)) {
                  finalPath.push(node);
                } else {
                  finalPath = [];
                  finalPath.push(node);
                }
              }
            }
          }
          finalPath.push(homeNode);
          AGVObj.move(finalPath)
        });
      }
    );



});
