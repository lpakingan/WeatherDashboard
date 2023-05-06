// API key for OpenWeather API
var APIKey = '9b79a9a79e9cfce63f28b86f4b366b67';

var submitButton = document.getElementById('submit-button');
var clearButton = document.getElementById('clear-button');
var currentWeatherEl = document.getElementById('current-weather');
var futureWeatherEl = document.getElementById('future-weather');
var searchResultsEl = document.querySelector('.search');
var storedCitiesEl = document.getElementById('stored-cities');

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
        cityOption.classList = 'btn btn-secondary btn-block mt-2 city-option-button';
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
    searchResultsEl.innerHTML = ''
    for (var i = 0; i < results.length; i++) {
        if (results[i].name == chosenOption[0] && results[i].state == chosenOption[1] && results[i].country == chosenOption[2]) {
            console.log(results[i].lat, results[i].lon);
            currentCity = results[i].name;
            cityLatitude = results[i].lat;
            cityLongitude = results[i].lon;
            storeCity(currentCity, cityLatitude, cityLongitude);
            showCities(searchedCities);
            getWeather(cityLatitude, cityLongitude);
            getForecast(cityLatitude, cityLongitude);
        // some search results do not have a state; this else statement accounts for them
        } else if (results[i].name == chosenOption[0] && chosenOption[1] == 'undefined' && results[i].country == chosenOption[2]) {
            console.log(results[i].lat, results[i].lon);
            currentCity = results[i].name;
            cityLatitude = results[i].lat;
            cityLongitude = results[i].lon;
            storeCity(currentCity, cityLatitude, cityLongitude);
            showCities(searchedCities);
            getWeather(cityLatitude, cityLongitude);
            getForecast(cityLatitude, cityLongitude);
    }}
}

function storeCity(currentCity, cityLatitude, cityLongitude) {
    var searchedCity = {
        city: currentCity,
        latitude: cityLatitude,
        longitude: cityLongitude
    }

    searchedCities.push(searchedCity);

    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

function showCities(searchedCities) {
    storedCitiesEl.innerText = '';

    for (var i = 0; i < searchedCities.length; i++) {
        var storedCity = document.createElement('button');
        storedCity.classList = 'btn btn-secondary btn-block mt-2 stored-city-button';
        storedCity.textContent = `${searchedCities[i].city}`;
        storedCitiesEl.appendChild(storedCity);
    }

    storedCityButton = document.querySelectorAll('.stored-city-button')
    for (var i = 0; i < storedCityButton.length; i++) {
        storedCityButton[i].addEventListener('click', function(event) {
            getStoredCity = event.target.innerText;
            showStoredCity(getStoredCity);
        });
    }
}

function showStoredCity(getStoredCity) {
    currentCity = '';
    cityLatitude = '';
    cityLongitude = '';

    for (var i = 0; i < searchedCities.length; i++) {
        if (searchedCities[i].city == getStoredCity) {
        currentCity = searchedCities[i].city;
        cityLatitude = searchedCities[i].latitude;
        cityLongitude = searchedCities[i].longitude;
    }}

    getWeather(cityLatitude, cityLongitude);
    getForecast(cityLatitude, cityLongitude);
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
                formatCurrent(currentWeather);
            });
        }
    });
}

// obtains data pertaining to the future weather
function getForecast(cityLatitude, cityLongitude) {
    // to get 5-day future forecast from coordinates pulled from the coordinateQuery API
    // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var forecastQuery = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${APIKey}&units=metric`;

    fetch(forecastQuery).then(function (response) {
        if (response.ok) {
            response.json().then(function (forecastResults) {
                console.log(forecastResults);
                var results = forecastResults;
                // creates a new array to store 5 time points in the future forecast
                var futureForecast = [];
                futureForecast.push(results.list[7]);
                futureForecast.push(results.list[15]);
                futureForecast.push(results.list[23]);
                futureForecast.push(results.list[31]);
                futureForecast.push(results.list[39]);
                console.log(futureForecast)
                formatForecast(futureForecast);
            });
        }
    });
}

// format the current weather parameters that were retrieved from the API
function formatCurrent(currentWeather) {
    currentWeatherEl.innerText = '';
    currentWeatherEl.classList = 'border border-dark col-12 my-3'

    cityHeader = document.createElement('h2');
    cityHeader.classList = 'font-weight-bold text-center';
    currentDate = dayjs.unix(currentWeather.dt).format('(M/D/YYYY)');
    cityHeader.innerText = `${currentCity} ${currentDate}`;
    currentWeatherEl.appendChild(cityHeader);

    currentIcon = document.createElement('img');
    iconCode = currentWeather.weather[0].icon;
    var iconQuery = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    currentIcon.src = (iconQuery);
    currentIcon.classList = 'd-block mx-auto';
    currentWeatherEl.appendChild(currentIcon);

    currentTemp = document.createElement('h5');
    currentTemp.classList = 'mt-3 text-center';
    currentFarenheit = Math.round((currentWeather.main.temp * 9/5) + 32);
    currentTemp.innerText = `Temperature: ${currentFarenheit}°F`;
    currentWeatherEl.appendChild(currentTemp);

    currentWind = document.createElement('h5');
    currentWind.classList = 'mt-3 text-center';
    currentMPH = Math.round(currentWeather.wind.speed * 1.609344);
    currentWind.innerText = `Wind: ${currentMPH} MPH`;
    currentWeatherEl.appendChild(currentWind);

    currentHumidity = document.createElement('h5');
    currentHumidity.classList = 'mt-3 text-center';
    currentHumidity.innerText = `Humidity: ${currentWeather.main.humidity}%`;
    currentWeatherEl.appendChild(currentHumidity);
}

// format the future weather parameters that were retrieved from the forecast API
function formatForecast(futureForecast) {
    futureWeatherEl.innerText = '';

    for (var i = 0; i < futureForecast.length; i++) {
        dayDiv = document.createElement('div');
        dayDiv.classList = 'col-lg-2 col-12 bg-dark text-light d-block m-auto py-3 rounded border border-light';

        dayDate = document.createElement('h5');
        dayDate.classList = 'font-weight-bold text-center';
        forecastDate = dayjs.unix(futureForecast[i].dt).format('M/D/YYYY');
        dayDate.innerText = `${forecastDate}`;
        dayDiv.appendChild(dayDate);

        futureIcon = document.createElement('img');
        iconCode = futureForecast[i].weather[0].icon;
        var iconQuery = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        futureIcon.src = (iconQuery);
        futureIcon.classList = 'd-block mx-auto';
        dayDiv.appendChild(futureIcon);

        futureTemp = document.createElement('h6');
        futureTemp.classList = 'mt-3 text-center';
        futureFarenheit = Math.round((futureForecast[i].main.temp * 9/5) + 32);
        futureTemp.innerText = `Temperature: ${futureFarenheit}°F`;
        dayDiv.appendChild(futureTemp);

        futureWind = document.createElement('h6');
        futureWind.classList = 'mt-3 text-center';
        futureMPH = Math.round(futureForecast[i].wind.speed * 1.609344);
        futureWind.innerText = `Wind: ${futureMPH} MPH`;
        dayDiv.appendChild(futureWind);
    
        futureHumidity = document.createElement('h6');
        futureHumidity.classList = 'mt-3 text-center';
        futureHumidity.innerText = `Humidity: ${futureForecast[i].main.humidity}%`;
        dayDiv.appendChild(futureHumidity);

        futureWeatherEl.appendChild(dayDiv);
    }
}

function init() {
    storedCities = JSON.parse(localStorage.getItem("searchedCities"))

    if(storedCities == null) {
        searchedCities = [];
    } else {
        searchedCities = storedCities;
        showCities(searchedCities);
    }
}

// when the submit button is clicked, calls on the handleCityInput function
submitButton.addEventListener('click', handleCityInput)

clearButton.addEventListener('click', function(event) {
    localStorage.removeItem("searchedCities");
    storedCitiesEl.innerHTML = '';
});

init();