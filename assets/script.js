var APIKey = '9b79a9a79e9cfce63f28b86f4b366b67';
var submitButton = document.getElementById('submit-button');

var currentLat;
var currentLon;
// to get weather from coordinates pulled from the coordinateQuery API
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
var queryString = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${APIKey}`

function getCity() {
    var searchQuery = document.location.search.split('&')
    // var searchQuery = coordinateQuery.split('&');

    var city = searchQuery[0].split('=').pop();
    console.log(city)
};

function handleCityInput(event) {
    event.preventDefault();

    cityInput = document.querySelector('#search-input').value.trim();

    if (!cityInput || cityInput == '') {
        alert('You must enter a city!');
        return;
    }
    
    findCoordinates(cityInput)
};

function findCoordinates(cityInput) {
    // to obtain the coordinates from the input city
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var coordinateQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${APIKey}` 

    fetch(coordinateQuery).then(function (response) {
        if (response.ok) {
            response.json().then(function (searchResults) {
                console.log(searchResults);
                results = searchResults;
                if (searchResults.length > 0) {
                    for (var i = 0; i < searchResults.length; i++) {
                        console.log(`City Name: ${searchResults[i].name} \n State (if any): ${searchResults[i].state} \n Country: ${searchResults[i].country} \n Latitude: ${searchResults[i].lat} \n Longitude: ${searchResults[i].lon}`)};
                } else {
                    console.log('No cities found! Please try searching again.');
                    alert('No cities found! Please try searching again.'); 
                }
            });
        } else {
            alert('Unable to search! Please try again.');
        }
    });
};

submitButton.addEventListener('click', handleCityInput)
