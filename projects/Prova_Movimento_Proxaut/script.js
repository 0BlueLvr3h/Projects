document.addEventListener("DOMContentLoaded", () => {


  getRequestOrder()
    .then(
      function (result) {
        try {
          //console.log(JSON.stringify(result, null, 4));
          //console.log(result[0].nodes[1].nodePosition.y);
          let node = new PathNode(result[0].nodes[1].sequenceId,
            result[0].nodes[1].nodePosition.x, result[0].nodes[1].nodePosition.y,
            result[0].nodes[1].released);
          console.log(node);
          for (let order of result) {
            let optionEl = document.createElement("option");
            optionEl.textContent = "" + order.orderId;
            optionEl.value = order.orderId;
            document.getElementById("orders").appendChild(optionEl);
            console.log(order);
          }

          document.getElementById("orders").addEventListener("change", () => {
            let orderDiv = document.getElementById("showOrder");
            orderDiv.innerHTML = "";
            console.log("ciao");
            var selectedOrder = document.getElementById("orders").value;
            var nodes;
            var edges;

            console.log(selectedOrder);
            for (let order of result) {
              if (order.orderId == selectedOrder) {
                selectedOrder = order;
                nodes = order.nodes;
                edges = order.edges;
              }
            }


            console.log(selectedOrder);
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


          })

        } catch (err) {
          console.log("Error: no orders in storage");
        }
      }
    );



  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  let nodePath = new Array();
  let nodeCoordPair = new Array();
  const homeNode = new PathNode(1, 90, 100, false, true);
  const elem = document.getElementById("animate");

  var AGVObj = new AGV(crypto.randomUUID, elem, homeNode);

  nodePath.push(homeNode);
  nodePath.push(new PathNode(2, 10, 400, true));
  nodePath.push(new PathNode(3, 365, 550, true));
  nodePath.push(new PathNode(4, 310, 300, true));
  nodePath.push(new PathNode(5, 250, 20, true));
  nodePath.push(new PathNode(6, 25, 600, true));
  nodePath.push(new PathNode(7, 150, 650, true));

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

  writeNodes(
    nodePath,
    nodeCoordPair,
    AGVObj.graphicElement,
    ctx,
    AGVObj.homePosition
  );

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

});
