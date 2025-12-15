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
  let cityElement = document.querySelector("#city");

  cityElement.textContent = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Have the default weather data display this city search
searchCity("Seattle");
