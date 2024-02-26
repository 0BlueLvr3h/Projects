
function collisionDetector(x, y, allNodes) {
    allNodes.forEach(function (node, i) {

    })
}


function isOverlapX(x, nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let otherNode = nodes[i];

        if (Math.abs(x - otherNode.x) < 10) {
            return true;
        }
    }

    return false;
}


function isOverlapY(y, nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let otherNode = nodes[i];

        if (Math.abs(y - otherNode.y) < 10) {
            return true;
        }
    }

    return false;
}
function drawStrokes(nodesToConnect, path, ctx) {
    ctx.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
    var finalNodes;
    ctx.strokeStyle = "red";

    finalNodes = nodesToConnect.map(nodesArray =>
        nodesArray.map(nodeIndex => path.find(node => node.index=== nodeIndex))
    );

    finalNodes.forEach(nodesArray => {
        nodesArray.reduce((prevNode, currentNode) => {
            ctx.beginPath();
            if (prevNode && currentNode) {
                ctx.moveTo(prevNode.y + 10, prevNode.x + 10);
                ctx.lineTo(currentNode.y + 10, currentNode.x + 10);
                ctx.stroke();
            }
        });
    });
    ctx.closePath();
}



function writeNodes(nodePath, nodeCoordPair, elem, ctx) {

    document.getElementById("nodes").innerHTML = "";


    //coppie di nodi da connettere
    console.log(connectedNodes);
    //coppie di nodi da connettere

    console.log("nodePath ", nodePath);


    nodePath.forEach(function (node, i) {
        nodeCoordPair.push(node);

        var biggerNode = document.createElement("div");
        biggerNode.className = "biggerDots";
        biggerNode.style.top = (node.x - 10) + "px";
        biggerNode.style.left = (node.y - 10) + "px";
        document.getElementById("nodes").appendChild(biggerNode);


        var nodeToAdd = document.createElement("div");
        nodeToAdd.className = "dots";
        nodeToAdd.style.top = node.x + "px";
        nodeToAdd.style.left = node.y + "px";
        if (node.isThisNodeHome()) {
            elem.style.top = node.x + "px";
            elem.style.left = node.y + "px";
            nodeToAdd.innerHTML = "H";
            nodePath.push(node);
            if (node.getIndex() - 1 == 0) {
                document.getElementById("start").innerHTML = "";
                var startNode = document.createTextNode("" + V)
                document.getElementById("start").appendChild(startNode);
            }
        } else {
            nodeToAdd.innerHTML = i + 1;
        }

        nodeToAdd.style.zIndex = 3;
        document.getElementById("nodes").appendChild(nodeToAdd);
        
    });
    drawStrokes(connectedNodes, nodePath, ctx);
    connectedNodes = [];
    
}
