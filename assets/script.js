var APIKey = '9b79a9a79e9cfce63f28b86f4b366b67';

var cityName;
var cityOptions;
// to obtain the coordinates from the input city
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var coordinateQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${cityOptions}&appid=${APIKey}` 

var currentLat;
var currentLon;
// to get weather from coordinates pulled from the coordinateQuery API
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
var queryString = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${APIKey}`
