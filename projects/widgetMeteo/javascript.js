document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener("click", () => {
        var position;
        var information;
        if (document.getElementById("searchBar").value != "") {
            position = document.getElementById("searchBar").value;
            var el = document.getElementById("container");
            var resp = new XMLHttpRequest();
            resp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    information = JSON.parse(this.response);
                    statusOK(information, el);
                } else if (this.status == 404) {
                    window.alert("città non trovata");
                    if (el.classList.contains("fadeIn")) {
                        el.classList.remove("fadeIn");
                        el.style.height = "105px";
                        document.getElementById("wb").classList.remove("fadeIn");
                        document.getElementById("wbd").classList.remove("fadeIn");
                    }
                }
            }
            resp.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + position + "&units=metric&appid=2934e39034c8406132c106cfd60c189a", false);
            resp.send();
        }
    })

    document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            document.getElementById("search").click();
        }
    })
})

function statusOK(information, container) {
    container.classList.add("fadeIn");
    container.style.height = "505px";
    console.log("connected");
    var temp = information.main.temp;
    var hum = information.main.humidity;
    var weather = information.weather[0].main;
    var wind = information.wind.speed;
    var imgDiv = document.getElementById("img");

    switch (weather) {
        case "Clear":
            {
                imgDiv.setAttribute("src", "sun.png");
                imgDiv.classList.add("fadeIn");
                weather = "Soleggiato";
                break;
            }
        case "Clouds":
            {
                imgDiv.setAttribute("src", "cloudy.png");
                imgDiv.classList.add("fadeIn");
                weather = "Nuvoloso";
                break;
            }
        case "Rain":
            {
                imgDiv.setAttribute("src", "rain.png");
                imgDiv.classList.add("fadeIn");
                weather = "Pioggia";
                break;
            }
    }

    temp = temp.toFixed(1);

    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById("hum").innerHTML = hum + "%";
    document.getElementById("weather").innerHTML = weather;
    document.getElementById("wind").innerHTML = wind + "km/h";

    document.getElementById("wb").classList.add("fadeIn");
    document.getElementById("wbd").classList.add("fadeIn");


}