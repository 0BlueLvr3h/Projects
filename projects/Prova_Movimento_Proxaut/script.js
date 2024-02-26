document.addEventListener("DOMContentLoaded", () => {


  let nodePath = new Array();
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  var AGVObj;
  var homeNode;
  let manualMode = false;
  document.getElementById("container").style.visibility = "hidden";
  document.getElementById("link").style.visibility = "hidden";
  document.getElementById("animation").style.visibility = "hidden";
  document.getElementById("delOrder").style.visibility = "hidden";
  document.getElementById("updateOrder").style.visibility = "hidden";


  getRequestOrder()
    .then(
      function (result) {
        let nodeCoordPair = new Array();
        const elem = document.getElementById("animate");
        try {
          for (let order of result) {
            let optionEl = document.createElement("option");
            optionEl.textContent = "" + order.orderId;
            optionEl.value = order.orderId;
            document.getElementById("orders").appendChild(optionEl);
          }

          document.getElementById("orders").addEventListener("change", () => {
            document.getElementById("container").style.visibility = "visible";
            document.getElementById("link").style.visibility = "visible";
            document.getElementById("animation").style.visibility = "visible";
            document.getElementById("delOrder").style.visibility = "visible";
            document.getElementById("updateOrder").style.visibility = "visible";
            nodePath = [];
            let orderDiv = document.getElementById("showOrder");
            orderDiv.innerHTML = "";
            var selectedOrder = document.getElementById("orders").value;
            var nodes;
            var edges;

            if (selectedOrder == "") {
              document.getElementById("container").style.visibility = "hidden";
              document.getElementById("link").style.visibility = "hidden";
              document.getElementById("animation").style.visibility = "hidden";
              document.getElementById("changeButton").style.visibility = "hidden";
              document.getElementById("delOrder").style.visibility = "hidden";
              document.getElementById("updateOrder").style.visibility = "hidden";

            } else if (selectedOrder != "Manual Mode") {
              manualMode = false;
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

              nodeCoordPair = [];
              ctx.clearRect(0, 0, c.width, c.height);


              nodes.forEach(function (node, i) {
                if (i == 0) {
                  homeNode = new PathNode(i,
                    node.nodePosition.x,
                    node.nodePosition.y,
                    node.released,
                    true
                  )
                  AGVObj = new AGV(crypto.randomUUID, elem, homeNode);
                  nodePath.push(homeNode);
                } else {
                  nodePath.push(new PathNode(i,
                    node.nodePosition.x,
                    node.nodePosition.y,
                    node.released
                  ));
                }

              })

              writeNodes(
                nodePath,
                nodeCoordPair,
                AGVObj.graphicElement,
                ctx,
                AGVObj.homePosition
              );

            }else{
              ctx.clearRect(0, 0, c.width, c.height);
              document.getElementById("nodes").innerHTML = "";
              manualMode = true;
            }
          });
        } catch (err) {
          console.log("Error: no orders in db");
        }

        document.getElementById("container").addEventListener("mousemove", (event) => {
          document.getElementById("coords").innerHTML = "X:" + ((event.offsetY) - 10) + "   Y:" + ((event.offsetX) - 10)
        })


        document.getElementById("delOrder").addEventListener("click", () => {
          deleteRequestOrder(document.getElementById("orders").value);
          location.reload();
        })

        document.getElementById("updateOrder").addEventListener("click", () => {
          document.getElementById("overlay").style.display = "block";

        })

        document.getElementById("orderButton").addEventListener("click", () => {
          if (isJsonString(document.getElementById("textarea").value)) {
            putRequestOrder(document.getElementById("textarea").value, document.getElementById("orders").value);
            location.reload();
          }
          document.getElementById("overlay").style.display = "none";
        });

        let manualNodes = new Array();
        document.getElementById("container").addEventListener("click", (event) => {
          nodePath = [];
          if (manualMode) {
            if (event.srcElement.nodeName != "DIV") {
              let node = document.createElement("div");
              node.className = "dots";
              node.style.top = event.offsetY - 10 + "px";
              node.style.left = event.offsetX - 10 + "px";
              node.innerHTML = manualNodes.length + 1;
              document.getElementById("nodes").appendChild(node);
              if (manualNodes.length == 0) {
                manualNodes.push(new PathNode(manualNodes.length + 1, node.offsetLeft, node.offsetTop, true, true));
                document.getElementById("animate").style.top = node.style.top;
                document.getElementById("animate").style.left = node.style.left;
                document.getElementById("start").innerHTML = manualNodes.length + "";
              } else {
                manualNodes.push(new PathNode(manualNodes.length + 1, node.offsetLeft, node.offsetTop, true));
              }
              let biggerNode = document.createElement("div");
              biggerNode.className = "biggerDots";
              biggerNode.style.top = (event.offsetY - 20) + "px";
              biggerNode.style.left = (event.offsetX - 20) + "px";
              document.getElementById("nodes").appendChild(biggerNode);
              console.log(manualNodes);
            }
          }
          setV(manualNodes.length);
          document.getElementById("destinationNode").max = manualNodes.length;
          nodePath = manualNodes;
        })


        var finalPath = new Array();
        document.getElementById("animation").addEventListener("click", () => {
          finalPath = [];
          var homeNodeIndex;
          var finalDestinationNumbers = dijkstra(homeNode.index, document.getElementById("destinationNode").value);

          for (number of finalDestinationNumbers) {
            nodePath.forEach((node, i) => {
              if (node.getIndex() + 1 == number) {
                finalPath.push(node);
              }
            })
          }

          nodePath.forEach(function (node, i) {
            if (node.isThisNodeHome()) {
              homeNodeIndex = i;
              finalPath.push(node);
            }
          });

          console.log(finalPath);
          AGVObj.move(finalPath)
        });
      }
    );



});
