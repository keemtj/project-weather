/* eslint-disable no-use-before-define */
// DOMs
const weatherToday = document.querySelector(".weather-today");
const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const histories = document.querySelector(".history");

// variable
const API_KEY = "bbcad54aeb4d627c3798f0773d883830";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
let data = [];
const weatherIcon = [
  "fas fa-cloud",
  "fas fa-smog",
  "fas fa-wind",
  "fas fa-sun",
  "fas fa-cloud-sun",
  "fas fa-cloud-sun-rain",
  "fas fa-cloud-rain",
  "fas fa-cloud-showers-heavy",
  "fas fa-snowflake",
];
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const historyStack = ["Seoul", "New York", "California", "London"];

const getTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const mins = time.getMinutes();
  const day = week[time.getDay()];
  const date = time.getDate();
  const moon = month[time.getMonth()];
  const sec = time.getSeconds();

  const clock = document.querySelector(".clock");
  clock.innerHTML = `${hours}:${
    mins < 10 ? "0" + mins : mins
  } ${day} ${date} ${moon} (KR)`;
  return { hours, mins, day, date, moon, sec };
};

const removeHistory = () => {
  console.log("remove history");
};

const searchLocation = (e) => {
  console.log("search location");
  e.preventDefault();
  const { value } = searchInput;
  getWeatherByCityName(value);
  manageSearchHistory(value);
};

const searchHistory = (e) => {
  if (e.target.matches(".remove-history") || e.target.matches("i")) return;
  console.log("search history");
  const value = e.target.textContent;
  getWeatherByCityName(value);
  manageSearchHistory(value);
};

const manageSearchHistory = (city) => {
  // 최대 10개까지 저장
  // 중복된 검색이면 찾아서 지우고, 맨 마지막으로 push
  historyStack.unshift(city);
  if (historyStack.length > 10) {
    historyStack.pop();
  }
  renderHistory();
};

// const renderWeek = () => {
//   console.log("render weather week");
// };

// const renderDetail = () => {
//   console.log("render detail");
// };

const renderHistory = () => {
  console.log("render History");
  let html = "";

  historyStack.forEach((stack) => {
    html += `
    <li>
      <div>${stack}</div>
      <button class="remove-history">
        <i class="fas fa-times"></i>
      </button>
    </li>
    `;
  });
  histories.innerHTML = html;
  [...histories.childNodes].forEach((history) =>
    history.addEventListener("click", searchHistory)
  );
  const removeBtns = document.querySelectorAll(".remove-history");
  [...removeBtns].forEach((button) =>
    button.addEventListener("click", removeHistory)
  );
};

const render = (city) => {
  const { temp } = data.main;
  const [{ main }] = data.weather;
  const { hours, mins, day, date, moon } = getTime();
  weatherToday.innerHTML = `
    <div class="temperature">
      ${Math.round(temp)}°
    </div>
    <div>
      <div class="location-name">${city}</div>
      <div class="clock">
        ${hours}:${mins < 10 ? "0" + mins : mins} ${day} ${date} ${moon} (KR)
      </div>
    </div>
    <div class="weather">
      <i class="${
        weatherIcon[Math.floor(Math.random() * 10) % weatherIcon.length]
      } icon-weather"></i>
      <div class="weather-state">${main}</div>
    </div>
  `;
};

const getWeatherByCityName = async (city = "seoul") => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const result = await response.json();
  data = await result;
  render(city);
};

// const getWeatherWeek = async (lat, lon) => {
//   const response = await fetch(
//     `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//   );
//   const data = await response.json();
//   console.log("weeeeeek~", data);
//   return data;
// };

const init = () => {
  getWeatherByCityName();
  setInterval(getTime, 1000);
  renderHistory();
};

// event
window.addEventListener("load", init);
form.addEventListener("submit", searchLocation);
