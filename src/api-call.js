export async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=MD4EKCYT6BVLXJTMVYMCEUTHJ`)
    const weatherData = await response.json();
    console.log(weatherData);
}