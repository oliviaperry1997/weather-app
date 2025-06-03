export async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=MD4EKCYT6BVLXJTMVYMCEUTHJ`)
    const weatherData = await response.json();
    const processedWeatherData = {
        resolvedAddress: weatherData.resolvedAddress,
        conditions: weatherData.currentConditions.conditions,
        time: weatherData.currentConditions.datetime,
        currentTemp: weatherData.currentConditions.temp,
        todayMaxTemp: weatherData.days[0].tempmax,
        todayMinTemp: weatherData.days[0].tempmin,
        windDir: weatherData.currentConditions.winddir,
        windSpeed: weatherData.currentConditions.windspeed,
        windGust: weatherData.currentConditions.windgust,
    }
    return processedWeatherData;
}