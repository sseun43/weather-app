var convertTempToCelsius = require("./convertTempToCelsius");

function handleResponse(wholeWeatherData) {
    var currentCondition = wholeWeatherData.currently.icon;
    var currentWindSpeed = Math.floor(wholeWeatherData.currently.windSpeed);
    var currentTemperature = convertTempToCelsius(wholeWeatherData.currently.temperature);
    var currentWeeksweather = wholeWeatherData.daily;
    return {
          loading:false,
          weekWeather: currentWeeksweather.data,
          mainIcon: currentWeeksweather.icon,
          currentCondition : currentCondition,
          currentWindSpeed : currentWindSpeed,
          currentTemperature : currentTemperature
        };
    }

module.exports = handleResponse;