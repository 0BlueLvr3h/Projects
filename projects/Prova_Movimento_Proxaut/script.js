document.addEventListener("DOMContentLoaded", () => {


  let nodePath = new Array();
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  var AGVObj;
  var homeNode;
  let manualMode = false;
  let manualNodes = new Array();
  var connectedNodes;

  document.getElementById("container").style.visibility = "hidden";
  document.getElementById("link").style.visibility = "hidden";
  document.getElementById("animation").style.visibility = "hidden";
  document.getElementById("delOrder").style.visibility = "hidden";
  document.getElementById("updateOrder").style.visibility = "hidden";
  document.getElementById("returnHome").style.visibility = "hidden";

  document.getElementById("manualDone").style.visibility = "hidden";


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
            connectedNodes = new Array();
            document.getElementById("container").style.visibility = "visible";
            document.getElementById("link").style.visibility = "visible";
            document.getElementById("animation").style.visibility = "visible";
            document.getElementById("delOrder").style.visibility = "visible";
            document.getElementById("updateOrder").style.visibility = "visible";
            document.getElementById("coords").style.visibility = "visible";
            document.getElementById("returnHome").style.visibility = "visible";

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
              document.getElementById("delOrder").style.visibility = "hidden";
              document.getElementById("updateOrder").style.visibility = "hidden";
              document.getElementById("coords").style.visibility = "hidden";
              document.getElementById("returnHome").style.visibility = "hidden";

              document.getElementById("manualDone").style.visibility = "hidden";
              manualNodes = [];

            } else if (selectedOrder != "Manual Mode") {
              document.getElementById("returnHome").disabled = true;
              document.getElementById("manualDone").disabled = true;
              document.getElementById("animation").disabled = false;
              document.getElementById("delOrder").disabled = false;
              document.getElementById("updateOrder").disabled = false;
              manualMode = false;
              manualNodes = [];
              for (let order of result) {
                if (order.orderId == selectedOrder) {
                  selectedOrder = order;
                  nodes = order.nodes;
                  edges = order.edges;
                }
              }

              setV(nodes.length);
              document.getElementById("start").innerHTML = nodes[0].nodeId.split('_')[1];
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
                  );
                  AGVObj = new AGV(crypto.randomUUID, elem, homeNode);
                  nodePath.push(homeNode);
                } else {
                  nodePath.push(new PathNode(i,
                    node.nodePosition.x,
                    node.nodePosition.y,
                    node.released
                  ));
                }
              });

              writeNodes(
                nodePath,
                nodeCoordPair,
                AGVObj.graphicElement,
                ctx,
                AGVObj.homePosition
              );

            } else {
              document.getElementById("animation").disabled = true;
              document.getElementById("delOrder").disabled = true;
              document.getElementById("updateOrder").disabled = true;
              document.getElementById("returnHome").disabled = true;

              document.getElementById("manualDone").disabled = true;
              ctx.clearRect(0, 0, c.width, c.height);
              document.getElementById("nodes").innerHTML = "";
              manualMode = true;
              document.getElementById("manualDone").style.visibility = "visible";
              alert("click to draw nodes");
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

        ///////////////manual insert


        document.getElementById("container").addEventListener("click", (event) => {
          nodePath = [];
          connectedNodes = new Array();
          if (manualMode) {
            if (event.srcElement.nodeName != "DIV") {
              let node = document.createElement("div");
              node.className = "dots";
              node.style.top = event.offsetY - 10 + "px";
              node.style.left = event.offsetX - 10 + "px";
              node.style.zIndex = 3;
              node.innerHTML = manualNodes.length + 1;
              document.getElementById("nodes").appendChild(node);
              if (manualNodes.length == 0) {
                document.getElementById("manualDone").disabled = false;
                homeNode = new PathNode(manualNodes.length, node.offsetTop, node.offsetLeft, true, true)
                manualNodes.push(homeNode);
                AGVObj = new AGV(crypto.randomUUID, elem, homeNode);
                document.getElementById("animate").style.top = node.style.top;
                document.getElementById("animate").style.left = node.style.left;
                document.getElementById("start").innerHTML = manualNodes.length + "";
              } else {
                manualNodes.push(new PathNode(manualNodes.length, node.offsetTop, node.offsetLeft, true));
              }
              let biggerNode = document.createElement("div");
              biggerNode.className = "biggerDots";
              biggerNode.style.top = (event.offsetY - 20) + "px";
              biggerNode.style.left = (event.offsetX - 20) + "px";
              document.getElementById("nodes").appendChild(biggerNode);
            }
          }
          setV(manualNodes.length);
          document.getElementById("destinationNode").max = manualNodes.length;
          nodePath = manualNodes;
        })

        document.getElementById("manualDone").addEventListener("click", (event) => {
          document.getElementById("animation").disabled = false;
          document.getElementById("delOrder").disabled = false;
          document.getElementById("updateOrder").disabled = false;
          document.getElementById("returnHome").disabled = false;
          connectedNodes = new Array();
          generateRandomAdjacentMatrix();
          connectedNodes = traceConnectedNodes();
          drawStrokes(connectedNodes, manualNodes, ctx);
          event.target.style.visibility = "hidden";
          manualMode = false;
        })

        //////////////////////////////

        var finalPath = new Array();
        document.getElementById("animation").addEventListener("click", () => {
          finalPath = [];
          var homeNodeIndex;
          var finalDestinationNumbers = dijkstra(homeNode.index, document.getElementById("destinationNode").value);


          if (finalDestinationNumbers.length == 0) {
            alert("node " + document.getElementById("destinationNode").value + " is not linked to source/the source is the same as destination");
          }

          for (number of finalDestinationNumbers) {
            nodePath.forEach((node, i) => {
              if (node.getIndex() + 1 == number) {
                finalPath.push(node);
              }
            })
          }


          AGVObj.move(finalPath);
        });

        document.getElementById("returnHome").addEventListener("click", () => {
          finalPath = finalPath.slice().reverse();

          nodePath.forEach((node, i) => {
            if (node.isThisNodeHome()) {
              homeNodeIndex = i;
              finalPath.push(node);
            }
          })

          AGVObj.move(finalPath);
        })

      }
    );
});
