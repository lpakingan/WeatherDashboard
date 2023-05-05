var APIKey = '9b79a9a79e9cfce63f28b86f4b366b67';
var submitButton = document.getElementById('submit-button');

var cityInput;
var cityOptions;
// to obtain the coordinates from the input city
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var coordinateQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=${cityOptions}&appid=${APIKey}` 

var currentLat;
var currentLon;
// to get weather from coordinates pulled from the coordinateQuery API
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
var queryString = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${APIKey}`

function getCity() {
    // var searchQuery = document.location.search.split('&')
    var searchQuery = coordinateQuery.split('&');

    var city = searchQuery[0].split('=').pop();
    var options = searchQuery[1].split('=').pop();
    // console.log(city, options)
}

function handleCityInput(event) {
    event.preventDefault();

    var cityInput = document.querySelector('#search-input').value.trim();

    if (!cityInput || cityInput == '') {
        alert('You must enter a city!');
        return;
    }

    // findCoordinates(cityInput);
    console.log(cityInput)
}

submitButton.addEventListener('click', handleCityInput)

getCity()