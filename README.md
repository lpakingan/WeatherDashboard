
## Strategy
The Weather Dashboard enables the user to retrieve up-to-date weather forecasts for a particular location using an API key from OpenWeather API. From a user perspective, the first step to finding the current weather and future forecast would be to input the desired location for the weather retrieval. The city search is conducted so that if the input is empty or there are no cities found the user is prompted to re-enter their city. Once a valid city is input, the city's name is passed onto a query that finds the city's geographical coordinates.

Because city names may not be unique, in cases where there is more than 1 city of the inputted name the user is presented a list of the top 5 search results. This allows for the user to specify which city they would like to get the weather for. Once the user picks the correct city, the resulting city's json file is parsed in order to get the city's latitudinal and longitudinal coordinates. These coordinates, along with the city's name, are stored in local storage for future retrieval and are passed onto two queries that take in the coordinates to fetch the current weather/forecast. 

The resulting response jsons of the weather/forecast queries are parsed for pertinent keys of information, such as the weather, temperature, wind speed, humidity, and icon depicting the weather. The user can also switch around to cities they may have previously looked at by clicking on any of the cities' buttons under the previous search. 

The functionality of the weather dashboard is shown below:

![](https://github.com/lpakingan/challenge-6-weather-dashboard/blob/main/assets/README_demos/dashboard_demo.gif)

## Resources Used
- W3Schools
- MDN Web Docs
- Stack Overflow
- [Day.js Documentation](https://day.js.org/docs/en/display/format)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [OpenWeather API Documentation](https://openweathermap.org/forecast5#5days)


## Deployed Application
The final deployed webpage can be found [here](https://lpakingan.github.io/WeatherDashboard/).
