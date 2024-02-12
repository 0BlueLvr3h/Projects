$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    $(".next").click(function () {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });

    $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });

    $('.radio-group .radio').click(function () {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function () {
        return false;
    })



    let orderUpdateId;

    document.getElementById("orderIdButton").disabled = true;

    document.getElementById("orderUpdateId").addEventListener("change", () => {
        orderUpdateId = document.getElementById("orderUpdateId");
        if (!checkIfBlank(orderUpdateId)) {
            alert("inserted");
            document.getElementById("orderIdButton").disabled = false;
        } else {
            alert("cannot be blank");
            document.getElementById("orderIdButton").disabled = true;
        }
    })

    /////////////////////////////Node///////////////////////////////
    let actionParam = new Array();
    let key;
    let value;

    //////////////////////////
    let actions = new Array();
    let actionId;
    let actionType;
    let blockingType;

    //////////////////////////
    let nodes = new Array();
    let idNode;
    let idSequence;
    let released;
    let nodePositionX;
    let nodePositionY;
    let mapId;



    document.getElementById("insertParamValue").addEventListener("click", () => {
        key = document.getElementById("parameterKey");
        value = document.getElementById("parameterValue");
        if (!checkIfActionBlank(key, value)) {
            actionParam.push(new actionParameter(key.value, value.value));
            console.log(key.value);
            console.log(value.value);

            key.value = "";
            value.value = "";
            alert("Inserted")
        } else {
            alert("cannot be blank");
        }
    });

    document.getElementById("confirmParamValues").addEventListener("click", () => {
        document.getElementById("action-param").style.display = "none";
    });

    /////////////////////////////////////////////////////////////////////////////


    document.getElementById("insertAction").addEventListener("click", () => {
        actionId = document.getElementById("actionId");
        actionType = document.getElementById("actionType");
        blockingType = document.getElementById("blockingType");

        if (!checkIfActionBlank(actionId, actionType, blockingType)) {
            actions.push(new Action(actionId.value, actionType.value, blockingType.value, actionParam))
            actionId.value = "";
            actionType.value = "";
            blockingType.value = "";
            alert("Inserted")
        } else {
            alert("cannot be blank");
        }


    });

    document.getElementById("confirmActions").addEventListener("click", () => {
        document.getElementById("action").style.display = "none";
    });

    /////////////////////////////////////////////////////////////////////////////

    document.getElementById("insertNode").addEventListener("click", () => {
        idNode = document.getElementById("idNode");
        idSequence = document.getElementById("idSequence");
        released = document.getElementById("released");
        nodePositionX = document.getElementById("nodePositionX");
        nodePositionY = document.getElementById("nodePositionY");
        mapId = document.getElementById("mapId");

        if (!checkIfBlank(idNode, idSequence, released, nodePositionX, nodePositionY, mapId)) {
            nodes.push(new Nodee(idNode.value, idSequence.value, released.value, new nodePosition(nodePositionX.value, nodePositionY.value, mapId.value), actions))
            idNode.value = "";
            idSequence.value = "";
            released.value = "";
            nodePositionX.value = "";
            nodePositionY.value = "";
            mapId.value = "";
            alert("Inserted")
        } else {
            alert("cannot be blank");
        }

        document.getElementById("action-param").style.display = "block";
        document.getElementById("action").style.display = "block";
        actionParam = [];
        actions = [];
    });

    document.getElementById("confirmNodes").addEventListener("click", () => {
        if ((nodes.length != 0)) {
            document.getElementById("nodes").style.display = "none";
            (nodes.forEach(function (node, i) { console.log(JSON.stringify(node)) }));
        } else {
            alert("Insert at least one parameter");
        }
    });

    ////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////Edge///////////////////////////////////////// 

    let edgeActionParam = new Array();
    let edgeKey;
    let edgeValue;
    ////////////////

    let edgeActions = new Array();
    let edgeActionId;
    let edgeActionType;
    let edgeBlockingType;

    ////////////////
    let edges = new Array();
    let edgeId;
    let edgeIdSequence;
    let edgeReleased;
    let edgeStart;
    let edgeEnd;

    document.getElementById("edgeInsertParamValue").addEventListener("click", () => {
        edgeKey = document.getElementById("edgeParameterKey");
        edgeValue = document.getElementById("edgeParameterValue");
        if (!checkIfActionBlank(edgeKey, edgeValue)) {
            edgeActionParam.push(new actionParameter(edgeKey.value, edgeValue.value));
            edgeKey.value = "";
            edgeValue.value = "";
            alert("inserted");
        } else {
            alert("cannot be blank");
        }
    });

    document.getElementById("edgeConfirmParamValues").addEventListener("click", () => {
        document.getElementById("edgeActionParameters").style.display = "none";
    });

    document.getElementById("edgeInsertAction").addEventListener("click", () => {
        edgeActionId = document.getElementById("edgeActionId");
        edgeActionType = document.getElementById("edgeActionId");
        edgeBlockingType = document.getElementById("edgeActionId");

        if (!checkIfActionBlank(edgeActionId, edgeActionType, edgeBlockingType)) {
            edgeActions.push(new Action(edgeActionId.value, edgeActionType.value, edgeBlockingType.value, edgeActionParam));
            edgeActionId.value = "";
            edgeActionType.value = "";
            edgeBlockingType.value = "";
            alert("inserted");
        } else {
            alert("cannot be blank");
        }
    });

    document.getElementById("edgeIconfirmActions").addEventListener("click", () => {
        document.getElementById("edgeActionDiv").style.display = "none";
    });

    document.getElementById("insertEdge").addEventListener("click", () => {
        edgeId = document.getElementById("edgeId");
        edgeIdSequence = document.getElementById("edgeIdSequence");
        edgeReleased = document.getElementById("edgeReleased");
        edgeStart = document.getElementById("edgeStart");
        edgeEnd = document.getElementById("edgeEnd");

        if (!checkIfBlank(edgeId, edgeIdSequence, edgeReleased, edgeStart, edgeEnd)) {
            edges.push(new Edge(edgeId.value, edgeIdSequence.value, edgeStart.value, edgeEnd.value, edgeReleased.value, edgeActions))
            edgeId.value = "";
            edgeIdSequence.value = "";
            edgeReleased.value = "";
            edgeStart.value = "";
            edgeEnd.value = "";
            alert("inserted");
        } else {
            alert("cannot be blank");
        }
        document.getElementById("edgeActionParameters").style.display = "block";
        document.getElementById("edgeActionDiv").style.display = "block";
        edgeActionParam = [];
        edgeActions = [];
    });

    document.getElementById("confirmEdges").addEventListener("click", () => {
        if (edges.length != 0) {
            document.getElementById("edge").style.display = "none";
            console.log(edges.forEach(function (edge, i) { console.log(edge); }));
        } else {
            alert("Insert at least one parameter");
        }
    });

    document.getElementById("makeOrder").addEventListener("click", () => {
        createOrder(orderUpdateId, nodes, edges)
    })


    function checkIfBlank(...elements) {
        for (let element of elements) {
            document.getElementById(element.id).value;

            if (document.getElementById(element.id).value == "") {
                return true;
            }
            if (document.getElementById(element.id).value == null) {
                return true;
            }
            if (document.getElementById(element.id).value == undefined) {
                return true;
            }
        }
        return false;
    }

    function checkIfActionBlank(...elements) {
        for (let element of elements) {
            document.getElementById(element.id).value;

            if (document.getElementById(element.id).value == null) {
                return true;
            }
            if (document.getElementById(element.id).value == undefined) {
                return true;
            }
        }
        return false;
    }

    function createOrder(orderUpdateId, nodes, edges) {
        let obj = new orderObject(orderUpdateId.value, nodes, edges);
        console.log(JSON.stringify(obj));
        postRequestOrder(obj);
        window.location.href = "../page.html";
    }

        /*  
            getRequestOrder();
            putRequestOrder(secondOrder,"65c22f8b45c4883095d90f96")
            deleteRequestOrder("65c22f8b45c4883095d90f96");
        */
});

