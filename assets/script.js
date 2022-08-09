// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var apiKey = '9f2c6723e6de890ebe76378298cc39d7'
var searchInput = document.querySelector('#search-input'); // we grab the reference to the element
var lat;
var long;
var searchValue = "";

var searchHistory = JSON.parse(localStorage.getItem('recent-cities')) || []

// saves search to local storage
function saveCity(newCity) {

    searchHistory.push(newCity);
    //removes duplicates
    // let filteredCities = searchHistory.filter((c, index) => {
    //     return searchHistory.indexOf(c) === index;
    // });

    localStorage.setItem('recent-cities', JSON.stringify(searchHistory));
    renderCity();
};

// populate recent searches as buttons
function renderCity() {
    $('#search-history').text("");
    // captures last 5 of array
    const lastFive = searchHistory.slice(-5);
    let counter = 0;
    lastFive.forEach(city => {
        if (counter === 5)
            return;
        $('#search-history').append((`<button class="btn btn-outline-primary d-grid gap-2 mx-auto m-0 results-button">${city}</button><br>`))
        counter++;
    });



}
// click event for results buttons
$('#search-history').on('click', ".results-button", function (event) {
    console.log(event.target.textContent);
    resultsClicked(event.target.textContent);
})

function resultsClicked(searchValue) {
    var locationAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&limit=5&appid=" + apiKey;

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

            $('#current-weather').empty()
            $('#weather-1').empty()

            searchInput.value = "";
            weatherAPI();
        });
}




function latLongAPI(event) {
    event.preventDefault();
    console.log("Searching");
    // update or capture the value from the form input
    searchValue = searchInput.value.trim();


    saveCity(searchValue);

    var locationAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&limit=5&appid=" + apiKey;

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

            $('#current-weather').empty()
            $('#weather-1').empty()

            searchInput.value = "";
            weatherAPI();
        });


}

function weatherAPI() {
    const weatherSearch = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=imperial";
    fetch(weatherSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('weather', data);
            var weather = data;

            if (weather)
                var fheit = weather.current.temp + "degrees F";

            // creates current weather block

            $('#current-weather').append(`<div class="bg-primary card container shadow current-weather-card position-absolute top-50 start-0 translate-middle">
            <h2 class="moment">${moment().format("dddd, MMMM Do YYYY")}</h2>
            <h3>Temp:${parseInt(fheit)}</h2>
            <h4>Wind Speed:${weather.current.wind_speed} MPH</h3>
            <h4>Humidity:${weather.current.humidity}%</h3>
            <h4>UV Index:${weather.current.uvi}</h3>
            </div>`)

            // creates 5-day forecast

            $('#weather-1').append(`<div class="d-flex">
            <div class="shadow bg-light m-2">
            <h3>${moment.unix(weather.daily[0].dt).format("dddd D/M/YY")}</h3>
            <h4>Temp:${parseInt(weather.daily[0].temp.day)}<br>
            Wind Speed:${weather.daily[0].wind_speed}<br>
            Humidity:${weather.daily[0].humidity}%
            </h4>
            </div>
            <div class="shadow bg-light m-2">
            <h3>${moment.unix(weather.daily[1].dt).format("dddd D/M/YY")}</h3>
            <h4>Temp:${parseInt(weather.daily[1].temp.day)}<br>
            Wind Speed:${weather.daily[1].wind_speed}<br>
            Humidity:${weather.daily[1].humidity}%
            </h4>
            </div>
            <div class="shadow bg-light m-2">
            <h3>${moment.unix(weather.daily[2].dt).format("dddd D/M/YY")}</h3>
            <h4>Temp:${parseInt(weather.daily[2].temp.day)}<br>
            Wind Speed:${weather.daily[2].wind_speed}<br>
            Humidity:${weather.daily[2].humidity}%
            </h4>
            </div>
            <div class="shadow bg-light m-2">
            <h3>${moment.unix(weather.daily[3].dt).format("dddd D/M/YY")}</h3>
            <h4>Temp:${parseInt(weather.daily[3].temp.day)}<br>
            Wind Speed:${weather.daily[3].wind_speed}<br>
            Humidity:${weather.daily[3].humidity}%
            </h4>
            </div>
            <div class="shadow bg-light m-2">
            <h3>${moment.unix(weather.daily[4].dt).format("dddd D/M/YY")}</h3>
            <h4>Temp:${parseInt(weather.daily[4].temp.day)}<br>
            Wind Speed:${weather.daily[4].wind_speed}<br>
            Humidity:${weather.daily[4].humidity}%
            </h4>
            </div>
            </div>`)
        })
}

$('#search').on('click', latLongAPI);

const kelvinToFahrenheit = kelvin => ((kelvin - 273.15) * 1.8) + 32;
console.log('test', kelvinToFahrenheit(275))

renderCity();

// To Do:
// click event on results button
// how to get columns inline
// how to fix the date
// how to format current date/time





