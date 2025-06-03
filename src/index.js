import "./styles.css";
import { getWeather } from "./api-call";

const locationContainer = document.querySelector("#location-container")

const locationInput = document.createElement("input");
locationInput.id = "location";
locationContainer.appendChild(locationInput);

const submit = document.createElement("button");
submit.textContent = "Submit"
submit.setAttribute("type", "button");
locationContainer.appendChild(submit);

async function printWeather(location) {
    try {
        const weather = await getWeather(location);
        console.log(weather);
        const weatherOutput = document.querySelector("#weather-output");
        weatherOutput.textContent = "";

        const weatherCond = document.createElement("p");
        weatherCond.textContent = `The current weather for ${weather.resolvedAddress} as of ${weather.time} is ${weather.conditions}.`;
        weatherOutput.appendChild(weatherCond);

        const weatherTemp = document.createElement("p");
        weatherTemp.textContent = `The current temperature is ${Math.floor(weather.currentTemp+0.5)}ºC, with a high of ${Math.floor(weather.todayMaxTemp+0.5)}ºC and a low of ${Math.floor(weather.todayMinTemp+0.5)}ºC.`;
        weatherOutput.appendChild(weatherTemp);

        const weatherWind = document.createElement("p");
        let windDirection;
        switch (Math.floor((weather.windDir+11.25)/22.5)) {
            case 0:
            case 16:
                windDirection = "north";
                break;
            case 1:
                windDirection = "north-northeast";
                break;
            case 2:
                windDirection = "northeast";
                break;
            case 3:
                windDirection = "east-northeast";
                break;
            case 4:
                windDirection = "east";
                break;
            case 5:
                windDirection = "east-southeast";
                break;
            case 6:
                windDirection = "southeast";
                break;
            case 7:
                windDirection = "south-southeast";
                break;
            case 8:
                windDirection = "south";
                break;
            case 9:
                windDirection = "south-southwest";
                break;
            case 10:
                windDirection = "southwest";
                break;
            case 11:
                windDirection = "west-southwest";
                break;
            case 12:
                windDirection = "west";
                break;
            case 13:
                windDirection = "west-northwest";
                break;
            case 14:
                windDirection = "northwest";
                break;
            case 15:
                windDirection = "north-northwest";
                break;
        }
        weatherWind.textContent = `Wind is currently ${weather.windSpeed} km/h from the ${windDirection}, with gusts up to ${weather.windGust} km/h.`;
        weatherOutput.appendChild(weatherWind);
    } catch {
        alert("Couldn't find that location.")
    }
}

submit.addEventListener("click", () => printWeather(locationInput.value))