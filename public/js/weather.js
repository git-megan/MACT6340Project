import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

function refreshWeather(response) {
  // Get and update the temperature in the HTML
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.textContent = Math.round(response.data.temp);

  // Update city name in the HTML
  let cityElement = document.querySelector("#city");
  cityElement.textContent = response.data.city;

  // Update weather emoji/icon in the HTML
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.icon}" alt="${response.data.condition}">`;

  // Update weather condition
  let conditionElement = document.querySelector("#condition");
  conditionElement.textContent = response.data.condition;

  // Update local time
  let timeElement = document.querySelector("#time");
  timeElement.textContent = response.data.time;

  // Update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.textContent = response.data.humidity;

  // Update wind speed
  let windSpeedElement = document.querySelector("#wind_speed");
  windSpeedElement.textContent = response.data.wind_speed;
}

function searchCity(city) {
  // Call backend for weather data (backend handles API call)
  let apiUrl = `/api/weather?city=${city}`;
  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch((err) => console.log(err));
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Have the default weather data display this city search
searchCity("Seattle");
