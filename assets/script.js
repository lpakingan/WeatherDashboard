var APIKey = '9b79a9a79e9cfce63f28b86f4b366b67';
var currentLat;
var currentLon;

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
var queryString = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${APIKey}` 
