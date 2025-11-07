import "./styles.css";
import { getWeather } from "./api-call";
import { getFavorites, addFavorite, removeFavorite, isFavorite, clearAllFavorites } from "./favorites";

const locationContainer = document.querySelector("#location-container")

const locationInput = document.createElement("input");
locationInput.id = "location";
locationInput.placeholder = "Enter city name or address...";
locationContainer.appendChild(locationInput);

const submit = document.createElement("button");
submit.textContent = "Submit"
submit.setAttribute("type", "button");
locationContainer.appendChild(submit);

const favoriteBtn = document.createElement("button");
favoriteBtn.id = "favorite-btn";
favoriteBtn.innerHTML = "☆ Add to Favorites";
favoriteBtn.setAttribute("type", "button");
favoriteBtn.classList.add("favorite-btn");
locationContainer.appendChild(favoriteBtn);

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
        
        // Update favorite button state after successful weather fetch
        updateFavoriteButtonState(weather.resolvedAddress);
        
    } catch {
        alert("Couldn't find that location.")
    }
}

// Function to update favorite button appearance
function updateFavoriteButtonState(location) {
    if (!location) return;
    
    if (isFavorite(location)) {
        favoriteBtn.innerHTML = "★ Remove from Favorites";
        favoriteBtn.classList.add("favorited");
    } else {
        favoriteBtn.innerHTML = "☆ Add to Favorites";
        favoriteBtn.classList.remove("favorited");
    }
    favoriteBtn.disabled = false;
}

// Function to render favorites list
function renderFavorites() {
    const favoritesContainer = document.querySelector("#favorites-container");
    const favorites = getFavorites();
    
    favoritesContainer.innerHTML = "";
    
    if (favorites.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No favorite locations saved yet.";
        emptyMessage.className = "empty-favorites";
        favoritesContainer.appendChild(emptyMessage);
        return;
    }
    
    favorites.forEach(location => {
        const favoriteItem = document.createElement("div");
        favoriteItem.className = "favorite-item";
        
        const favoriteBtn = document.createElement("button");
        favoriteBtn.textContent = location;
        favoriteBtn.className = "favorite-location-btn";
        favoriteBtn.addEventListener("click", () => {
            locationInput.value = location;
            printWeather(location);
        });
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.className = "remove-favorite-btn";
        removeBtn.title = "Remove from favorites";
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            removeFavorite(location);
            renderFavorites();
            // Update main favorite button if this was the current location
            const currentLocation = document.querySelector("#weather-output p")?.textContent;
            if (currentLocation && currentLocation.includes(location)) {
                updateFavoriteButtonState(location);
            }
        });
        
        favoriteItem.appendChild(favoriteBtn);
        favoriteItem.appendChild(removeBtn);
        favoritesContainer.appendChild(favoriteItem);
    });
}

// Event listeners
submit.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        printWeather(location);
    }
});

favoriteBtn.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (!location) {
        alert("Please enter a location first.");
        return;
    }
    
    if (isFavorite(location)) {
        if (removeFavorite(location)) {
            updateFavoriteButtonState(location);
            renderFavorites();
        }
    } else {
        if (addFavorite(location)) {
            updateFavoriteButtonState(location);
            renderFavorites();
        } else {
            alert("This location is already in your favorites.");
        }
    }
});

// Clear all favorites button
const clearFavoritesBtn = document.querySelector("#clear-favorites");
clearFavoritesBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all favorite locations?")) {
        clearAllFavorites();
        renderFavorites();
        favoriteBtn.innerHTML = "☆ Add to Favorites";
        favoriteBtn.classList.remove("favorited");
    }
});

// Allow Enter key to submit
locationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submit.click();
    }
});

// Initialize favorites display on page load
document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
});