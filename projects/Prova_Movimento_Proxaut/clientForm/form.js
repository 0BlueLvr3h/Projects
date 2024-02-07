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


        /*  
            postRequestOrder(exampleOrder);
            getRequestOrder();
            putRequestOrder(secondOrder,"65c22f8b45c4883095d90f96")
            deleteRequestOrder("65c22f8b45c4883095d90f96");
        */ 

    /////////////////////////////Node///////////////////////////////

    document.getElementById("insertParamValue").addEventListener("click", () => {
        let key = document.getElementById("parameterKey").value;
        console.log(key);
    });

    document.getElementById("confirmParamValues").addEventListener("click", () => {
        console.log("m");
    });

    /////////////////////////////////////////////////////////////////////////////


    document.getElementById("insertAction").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("confirmActions").addEventListener("click", () => {
        console.log("m");
    });

    /////////////////////////////////////////////////////////////////////////////

    document.getElementById("insertNode").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("confirmNodes").addEventListener("click", () => {
        console.log("m");
    });

    ////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////Edge///////////////////////////////////////// 

    document.getElementById("edgeInsertParamValue").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("edgeConfirmParamValues").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("edgeInsertAction").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("edgeIconfirmActions").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("insertEdge").addEventListener("click", () => {
        console.log("m");
    });

    document.getElementById("confirmEdges").addEventListener("click", () => {
        console.log("m");
    });

});


function createOrder(orderUpdateId, nodes, edges) {
    let obj = new orderObject(orderUpdateId, nodes, edges);
    console.log(obj);
}