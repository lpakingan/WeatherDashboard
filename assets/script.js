// API key for OpenWeather API
var APIKey = '9b79a9a79e9cfce63f28b86f4b366b67';

var submitButton = document.getElementById('submit-button');
var searchResultsEl = document.querySelector('.search')

// function getCity() {
//     var searchQuery = document.location.search.split('&')

//     var city = searchQuery[0].split('=').pop();
//     console.log(city)
// };

// handles the user input when searching for a city
// if the input is empty, alerts user to enter a city
// passes the city input to the findCoordinates function
function handleCityInput(event) {
    event.preventDefault();

    cityInput = document.querySelector('#search-input').value.trim();

    if (!cityInput || cityInput == '') {
        alert('You must enter a city!');
        return;
    }
    
    findCoordinates(cityInput)
};

// takes the city input, passes it into the coordinate query variable, and sends a fetch request
// if successful, creates a variable containing the results and console logs them
// if unsuccessful (i.e there are no search results returned), alerts the user that no cities are found with that input
// if given a response error (i.e no response at all), alerts the user that the search failed and to try again
// passes the successful results to the chooseCity function
function findCoordinates(cityInput) {
    // to obtain the coordinates from the input city
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var coordinateQuery = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${APIKey}` 

    fetch(coordinateQuery).then(function (response) {
        if (response.ok) {
            response.json().then(function (searchResults) {
                console.log(searchResults);
                results = searchResults;
                if (searchResults.length > 0) {
                    for (var i = 0; i < searchResults.length; i++) {
                        console.log(`City Name: ${searchResults[i].name} \n State (if any): ${searchResults[i].state} \n Country: ${searchResults[i].country} \n Latitude: ${searchResults[i].lat} \n Longitude: ${searchResults[i].lon}`)};
                        chooseCity(results);
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

// creates a list of buttons for different city options if there is more than 1 result for the city search
// the button that is clicked has an array containing its inner text passed onto the getCoordinates function
function chooseCity(results) {
    searchResultsEl.innerHTML = ''

    chooseHeader = document.createElement('h3');
    chooseHeader.classList = 'text-center m-2';
    chooseHeader.textContent = 'Which City?';
    searchResultsEl.appendChild(chooseHeader)

    for (var i = 0; i < results.length; i++) {
        var cityOption = document.createElement('button');
        cityOption.classList = 'btn btn-dark btn-block mt-2 city-option-button';
        cityOption.textContent = `${results[i].name}, ${results[i].state}, ${results[i].country}`;
        searchResultsEl.appendChild(cityOption);
    }

    var optionButton = document.querySelectorAll('.city-option-button')
    for (var i = 0; i < optionButton.length; i++) {
        optionButton[i].addEventListener('click', function(event) {
            chosenOption = event.target.innerText.split(', ');
            getCoordinates(results, chosenOption);
        });
    }
}

// takes the results array (containing all the returned search results) and the chosen option array (from the previous function)
// iterates through each of the results indexes to find which result index matches with the items in the chosen option
// obtains the latitude and longitude coordinates from the matching result 
// passes these coordinates into the getWeather/getForecast functions
function getCoordinates(results, chosenOption) {
    for (var i = 0; i < results.length; i++) {
        if (results[i].name == chosenOption[0] && results[i].state == chosenOption[1] && results[i].country == chosenOption[2]) {
            console.log(results[i].lat, results[i].lon);
            cityLatitude = results[i].lat;
            cityLongitude = results[i].lon;
            getWeather(cityLatitude, cityLongitude);
            getForecast(cityLatitude, cityLongitude);
        // some search results do not have a state; this else statement accounts for them
        } else if (results[i].name == chosenOption[0] && chosenOption[1] == 'undefined' && results[i].country == chosenOption[2]) {
            console.log(results[i].lat, results[i].lon);
            cityLatitude = results[i].lat;
            cityLongitude = results[i].lon;
            getWeather(cityLatitude, cityLongitude);
            getForecast(cityLatitude, cityLongitude);
    }}
}

// obtains data pertaining to the current weather
function getWeather(cityLatitude, cityLongitude) {
    // to get current weather from coordinates pulled from the coordinateQuery API
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    var weatherQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${APIKey}&units=metric`;

    fetch(weatherQuery).then(function (response) {
        if (response.ok) {
            response.json().then(function (weatherResults) {
                console.log(weatherResults);
                currentWeather = weatherResults;
            });
        }
    });
}

// obtains data pertaining to the future weather
function getForecast(cityLatitude, cityLongitude) {
    // to get 5-day future forecast from coordinates pulled from the coordinateQuery API
    // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var forecastQuery = `https://api.openweathermap.org/data/2.5/forecast?cnt=5&lat=${cityLatitude}&lon=${cityLongitude}&appid=${APIKey}&units=metric`;

    fetch(forecastQuery).then(function (response) {
        if (response.ok) {
            response.json().then(function (forecastResults) {
                console.log(forecastResults);
                futureForecast = forecastResults;
            });
        }
    });
}

// when the submit button is clicked, calls on the handleCityInput function
submitButton.addEventListener('click', handleCityInput)
