// Create Variables 
var input = document.getElementById('input_text');
var city = document.getElementById('City');
var temperature = document.getElementById('Temperature');
var wind = document.getElementById('Wind');
var humidity = document.getElementById('Humidity');
var uvIndex = document.getElementById('uvIndex');
var button = document.getElementById('submit');
var APIKey = "a7cef51d92248879613b36f93ac710ed";

// Create a fetch
function getWeatherInfo() {
    var rawCity = document.getElementById("rawcity").value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + rawCity + "&appid=a7cef51d92248879613b36f93ac710ed";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)


            let lat = data.coord.lat;
            let lon = data.coord.lon;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,hourly,minutely,alerts&appid=" + APIKey)
                .then(response => response.json())
                .then(function (response) {
                    console.log(response)
                    // For each loop
                    var Ind = 1; // create variable to increase
                    response.daily.forEach(element => {
                        if (Ind < 6) { // 6 elements
                            var newdate = new Date(element.dt * 1000).toLocaleDateString();

                            city = document.getElementById("City" + Ind);
                            city.innerHTML = data.name + "(" + newdate + ")"

                            temperature = document.getElementById("Temperature" + Ind);
                            temperature.innerHTML = "Temperature: " + element.temp.day

                            wind = document.getElementById("Wind" + Ind);
                            wind.innerHTML = "Wind: " + element.wind_speed

                            humidity = document.getElementById("Humidity" + Ind);
                            humidity.innerHTML = "Humidity: " + element.humidity

                            uvIndex = document.getElementById("uvIndex" + Ind)
                            uvIndex.innerHTML = "uvIndex: " + element.uvi
                            Ind++;

                        }
                    });
                })
        })
};
// key-up Enter to get weather info.
document.getElementById("rawcity").addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        getWeatherInfo();
    }
});
// press Button to get weather info.
button.addEventListener('click', function () {
    getWeatherInfo();
});

