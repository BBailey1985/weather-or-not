var userFormEl = document.querySelector("#user-form");
var searchButtonEl = document.querySelector("#search-button");
var searchCityNameEl = document.querySelector("#search-city-name");
var stationinfoEl = document.querySelector("#station-info");
var cityNameEl = document.querySelector("#city-name");
var weatherPicEl = document.querySelector("#weather-pic");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");

// API key to pull in data
var apiKey = "1c06fdea9753395ddbde291bde578a40";


//function to get weather
var getWeather = function(cityName) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

  //fetch the API and then display data
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      //current weather 
      var currentDay = moment().format("L"); 
      cityNameEl.textContent = data.name + " (" + currentDay + ")";
      var weatherPic = data.weather[0].icon;
      weatherPicEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
      tempEl.textContent = "Temp: " + data.main.temp + " °F";
      windEl.textContent = "Wind: " + data.wind.speed + " MPH";
      humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
    
      // get UV Index 
      var stationLat = data.coord.lat;
      var stationLong = data.coord.lon;
      var uvApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + stationLat + "&lon=" + stationLong + "&appid=" + apiKey;

      //fetch new API for UV Index and then display data
      fetch(uvApiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        var uvIndexSpan = document.createElement("span");

        //adds colors to UV index and append
        if (data.current.uvi < 2) {
          uvIndexSpan.setAttribute("class", "btn btn-success")
        } else if (data.current.uvi < 5) {
          uvIndexSpan.setAttribute("class", "btn btn-warning")
        } else {
          uvIndexSpan.setAttribute("class", "btn btn-danger")
        }
        console.log(data.current.uvi);
        uvIndexSpan.textContent = data.current.uvi
        uvIndex.textContent = "UV Index: ";
        uvIndex.append(uvIndexSpan);
        }); 
      });
    });
  });
}





searchButtonEl.addEventListener("click", function () {
  var selectedCity = searchCityNameEl.value;
  getWeather(selectedCity);
  searchCityNameEl.value ="";
});
