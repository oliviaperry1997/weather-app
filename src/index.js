import "./styles.css";
import { getWeather } from "./api-call";

const body = document.querySelector("body")
const locationContainer = document.querySelector("#location-container")
body.appendChild(locationContainer)

const locationInput = document.createElement("input");
locationInput.id = "location";
locationContainer.appendChild(locationInput);

const submit = document.createElement("button");
submit.textContent = "Submit"
submit.setAttribute("type", "button");
locationContainer.appendChild(submit);

submit.addEventListener("click", () => getWeather(locationInput.value))