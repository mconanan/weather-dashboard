// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var apiKey = '9f2c6723e6de890ebe76378298cc39d7'
var searchInput = $('#search-input'); // we grab the reference to the element
var lat;
var long;

function latLongAPI(event) {
    event.preventDefault();
    console.log("Searching");
    // update or capture the value from the form input
    searchInput = searchInput.val();
    console.log(searchInput);
    
    var locationAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + apiKey;

    fetch(locationAPI)
        .then(function (response) {
                return response.json();
            })
        .then(function (data) {
            console.log(data);
            // update our data values
            lat = data[0].lat;
            long = data[0].lon;
            // because of the asynchonous nature of js, we need to call the weatherAPI function here, so it only runs once the location function data is returned.
            weatherAPI();
        });

        
}
    
function weatherAPI() {
    var weatherSearch = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
    fetch(weatherSearch)
        .then(function (response) {
            return response.json ();
        })
        .then(function (data) {
            console.log('weather', data);
            var weather = data;

            if (weather)
            var fheit = ((weather.current.temp - 273.15) * 1.8) + 32 + " degrees"; 
            $('#current-weather').text(fheit);
            $('#weather-1').text(JSON.stringify(weather.daily[0].temp))
            $('#weather-2').text(JSON.stringify(weather.daily[1].temp))
            $('#weather-3').text(JSON.stringify(weather.daily[2].temp))
            $('#weather-4').text(JSON.stringify(weather.daily[3].temp))
            $('#weather-5').text(JSON.stringify(weather.daily[4].temp))

        })
}

$('#search').on('click', latLongAPI);


// To Do: math.floor to round fheit? ; create kelvin to farenheit function to appy to all results instead.





