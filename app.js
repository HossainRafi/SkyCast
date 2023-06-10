//  State
let currCity = "Dhaka";
let units = "metric";

// Get weather data
function getWeather() {
  const API_KEY = "56d65ef6ff2d2e6bfc29f01b9a112671";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}
