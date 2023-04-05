// Show current day
function showCurrentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Suturday"
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let dayAndTime = `${day}, ${hours}:${minutes}`;
  return dayAndTime;
}

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = showCurrentDate();

// Weather API

function showTemperature(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let key = "866a208a73eeff02182218e9441647a1";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showCity);

// Fahrentheight to celcius
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 12;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
