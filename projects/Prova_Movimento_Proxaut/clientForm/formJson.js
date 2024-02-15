document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("orderIdButtonJson").addEventListener("click", () => {
        if (isJsonString(document.getElementById("textarea").value)) {
            postRequestOrder(document.getElementById("textarea").value)
                .then((result) => {
                    console.log("ciao" + result);
                    document.getElementById("textarea").value = "";
                    window.location.href = "../page.html"
                }).catch((error) => { console.log(error); });
        } else {
            alert("Cannot be blank (or invalid JSON String)");
        }
    })

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

})