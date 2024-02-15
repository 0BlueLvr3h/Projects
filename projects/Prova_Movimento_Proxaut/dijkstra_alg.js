
let V;
var matrix = [];

function setV(length) {
    V = length + 1;
}

function getV() {
    return V;
}

function generateRandomAdjacentMatrix() {
    matrix = [];
    for (let i = 0; i < V; i++) {
        matrix[i] = [];
        for (let j = 0; j < V; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < V; i++) {
        for (let j = i + 1; j < V; j++) {
            var random_boolean = Math.random() < 0.5;
            if (random_boolean) {
                matrix[i][j] = matrix[j][i] = Math.floor(Math.random() * 20);
            }else{
                matrix[i][j] = matrix[j][i] = 0;
            }
        }
    }

    console.log(matrix);
}


function minDistance(dist, sptSet) {
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for (let v = 0; v < V; v++) {
        if (sptSet[v] == false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

function printSolution(dist, parent, src, destinationNode) {
    let finalPath = new Array();
    for (let i = 0; i < V; i++) {
        if (i !== src && i == destinationNode - 1) {
            console.log(`To Node ${i + 1}:`);
            console.log(`From Node ${src + 1}`);
            printPath(parent, i, finalPath);
            console.log(`Distance:` + dist[i]);
        }
    }
    return finalPath;
}

function printPath(parent, j, path) {
    if (parent[j] == -1)
        return;

    printPath(parent, parent[j], path);
    console.log(" -> " + (j + 1));
    path.push(j + 1);
}


function dijkstra(src, destinationNode) {

    let dist = new Array(V);
    let sptSet = new Array(V);
    let parent = new Array(V);

    for (let i = 0; i < V; i++) {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
        parent[i] = -1;
    }

    dist[src] = 0;

    for (let count = 0; count < V - 1; count++) {
        let u = minDistance(dist, sptSet);
        sptSet[u] = true;

        for (let v = 0; v < V; v++) {
            if (!sptSet[v] && matrix[u][v] != 0 && dist[u] != Number.MAX_VALUE && dist[u] + matrix[u][v] < dist[v]) {
                dist[v] = dist[u] + matrix[u][v];
                parent[v] = u;
            }
        }
    }


    finalPath = printSolution(dist, parent, src, destinationNode);
    return finalPath;
}


