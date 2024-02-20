
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


function drawStrokes(nodesToConnect, ctx, homeNode) {

    ctx.beginPath();
    ctx.strokeStyle = "red";

    const firstNode = nodesToConnect[0];
    const startX = homeNode.y + 10;
    const startY = homeNode.x + 10;
    const endX = firstNode.y + 10;
    const endY = firstNode.x + 10;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    let prevNode = firstNode;
    for (let i = 1; i < nodesToConnect.length; i++) {
        const currentNode = nodesToConnect[i];
        const startX = prevNode.y + 10;
        const startY = prevNode.x + 10;
        const endX = currentNode.y + 10;
        const endY = currentNode.x + 10;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        prevNode = currentNode;
    }

    const lastNode = nodesToConnect[nodesToConnect.length - 1];
    for (let i = 0; i < nodesToConnect.length - 1; i++) {
        const otherNode = nodesToConnect[i];
        const startX = lastNode.y + 10;
        const startY = lastNode.x + 10;
        const endX = otherNode.y + 10;
        const endY = otherNode.x + 10;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
    }

    ctx.stroke();
}



function writeNodes(nodePath, nodeCoordPair, elem, ctx, homeNode) {
    document.getElementById("nodes").innerHTML = "";


    //coppie di nodi da connettere
    console.log(connectedNodes);
    //coppie di nodi da connettere



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
            nodeToAdd.innerHTML = i;
        }

        nodeToAdd.style.zIndex = 3;

        drawStrokes(nodeCoordPair, ctx, homeNode);

        document.getElementById("nodes").appendChild(nodeToAdd);

    });
}
