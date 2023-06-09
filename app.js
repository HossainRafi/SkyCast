//  State
let currCity = "Dhaka";
let units = "metric";

// Selector variables
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");
let celcius = document.querySelector(".weather_unit_celsius");
let fahrenheit = document.querySelector(".weather_unit_farenheit");

// Search weather details
document.querySelector(".weather__search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  e.preventDefault();
  currCity = search.value;
  getWeather();
  search.value = "";
});

// Convert unit to celsius
celcius.addEventListener("click", () => {
  celcius.style.color = "red";
  fahrenheit.style.color = "white";
  if (units !== "metric") {
    units = "metric";
    getWeather();
  }
});

// Convert unit to fahrenheit
fahrenheit.addEventListener("click", () => {
  fahrenheit.style.color = "red";
  celcius.style.color = "white";
  if (units !== "imperial") {
    units = "imperial";
    getWeather();
  }
});

// Convert date & time
function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// Convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

// Get all weather data and shows in UI
function getWeather() {
  const API_KEY = "56d65ef6ff2d2e6bfc29f01b9a112671";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weather__forecast.innerHTML = `<p>${data.weather[0].main}`;
      weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
      weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
      weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
      weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weather__humidity.innerHTML = `${data.main.humidity}%`;
      weather__wind.innerHTML = `${data.wind.speed} ${
        units === "imperial" ? "mph" : "m/s"
      }`;
      weather__pressure.innerHTML = `${data.main.pressure} hPa`;
    });
}

document.body.addEventListener("load", getWeather());
