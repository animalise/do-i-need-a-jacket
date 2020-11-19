function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function submitCity(event) {
  event.preventDefault();
  let apiKey = "af173d370d3263e90c511e8cd78a494a";
  let cityName = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCityTemp);
}

function displayCityTemp(response) {
  console.log(response.data);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}° F`;
  document.querySelector(".atmosphere").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".current-high").innerHTML = `High: ${Math.round(
    response.data.main.temp_max
  )}°F`;
  document.querySelector(".current-low").innerHTML = `Low: ${Math.round(
    response.data.main.temp_min
  )}°F`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);
