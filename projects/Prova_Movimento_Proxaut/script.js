document.addEventListener("DOMContentLoaded", () => {
  var text = '{"firstName":"John", "lastName": "Doe", "email":"john@gmail.com","favoriteSubjects":["Computer Science", "History"]}';
  getRequest();
  postRequest(text);

  const exampleOrder = {
    orderId: crypto.randomUUID,
    orderUpdateId: 0,
    nodes: [
      {
        nodeId: "productionunit_1",
        sequenceId: 0,
        released: true,
        nodePosition: { x: 0, y: 0, mapId: "local" },
        actions: [
          {
            actionId: "a001",
            actionType: "pick",
            blockingType: BlockingType.HARD,
            actionParameters: [
              { key: "stationType", value: "floor" },
              { key: "loadType", value: "EPAL" },
            ],
          },
        ],
      },
      {
        nodeId: "productionunit_2",
        sequenceId: 2,
        released: true,
        nodePosition: { x: 100, y: 200, mapId: "local" },
        actions: [
          {
            actionId: "a002",
            actionType: "drop",
            blockingType: BlockingType.HARD,
            actionParameters: [
              { key: "stationType", value: "floor" },
              { key: "loadType", value: "EPAL" },
            ],
          },
        ],
      },
    ],
    edges: [
      {
        edgeId: "productionunit_1_2",
        sequenceId: 1,
        startNodeId: "productionunit_1",
        endNodeId: "productionunit_2",
        released: true,
        actions: [],
      },
    ],
  };

  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  let nodePath = new Array();
  let nodeCoordPair = new Array();
  const homeNode = new PathNode(1, 90, 100, true, false);
  const elem = document.getElementById("animate");
  let isPaused = false;

  var AGVObj = new AGV(crypto.randomUUID, elem, homeNode);

  nodePath.push(homeNode);
  nodePath.push(new PathNode(2, 10, 400, false, true));
  nodePath.push(new PathNode(3, 365, 550, false, true));
  nodePath.push(new PathNode(4, 310, 300, false, true));
  nodePath.push(new PathNode(5, 250, 20, false, true));
  nodePath.push(new PathNode(6, 25, 600, false, true));
  nodePath.push(new PathNode(7, 150, 650, false, true));

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

      node = new PathNode(i + 1, newX, newY, false, true);
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
    document.getElementById("continue").disabled = false;
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
  });

  document.getElementById("continue").addEventListener("click", () => {
    isPaused = false;
    finalPath.forEach(function(node,i){

    });
    
    AGVObj.move(finalPath);
  });
});
