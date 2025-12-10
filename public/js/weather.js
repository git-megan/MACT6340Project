import dotenv from "dotenv";
dotenv.config();

function refreshWeather(response) {
  // Get and update the temperature in the HTML
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.textContent = Math.round(
    response.data.temperature.current
  );

  // Update city name in the HTML
  let cityElement = document.querySelector("#city");
  cityElement.textContent = response.data.city;
}

function searchCity(city) {
  let apiKey = "0t46o23ed0fd5ba55b5549905c06fafe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
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
