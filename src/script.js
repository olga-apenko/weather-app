// Show current day
function showCurrentDate() {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Suturday',
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let dayAndTime = `${day} ${hours}:${minutes}`;
  return dayAndTime;
}

let currentDay = document.querySelector('#current-day');
currentDay.innerHTML = showCurrentDate();

function displayForecast() {
  let forecastElement = document.querySelector('#forecast');
  let days = ['Thu', 'Fri', 'Sat', 'Sun'];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img
      src="http://openweathermap.org/img/wn/50d@2x.png"
      alt=""
      width="42"
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> 18° </span>
      <span class="weather-forecast-temperature-min"> 12° </span>
    </div>
  </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Weather API

function showTemperature(response) {
  document.querySelector('#current-location').innerHTML = response.data.name;
  document.querySelector('#temperature').innerHTML = Math.round(
    response.data.main.temp
  );

  celciusTemperature = response.data.main.temp;

  document.querySelector('#description').innerHTML =
    response.data.weather[0].main;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document
    .querySelector('#icon')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector('#icon')
    .setAttribute('alt', response.data.weather[0].description);
}

function searchCity(city) {
  let key = '866a208a73eeff02182218e9441647a1';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector('.search-input').value;
  searchCity(city);
}

let searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', showCity);

// Fahrentheight
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  let fahrentheightTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrentheightTemperature);
}

// Celcius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  fahrenheitLink.classList.remove('active');
  celsiusLink.classList.add('active');
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', convertToFahrenheit);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', convertToCelsius);

searchCity('Kyiv');
displayForecast();
