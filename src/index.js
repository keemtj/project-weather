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
let historyStack = [
  { id: 0, city: "Seoul" },
  { id: 1, city: "New York" },
  { id: 2, city: "California" },
  { id: 3, city: "London" },
].reverse();

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
  } ${day} ${date} ${moon}`;
  return { hours, mins, day, date, moon, sec };
};

const removeHistory = (e) => {
  if (e.target.matches(".history > li")) return;
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

// eslint-disable-next-line no-confusing-arrow
const nextId = () =>
  historyStack.length
    ? Math.max(...historyStack.map((stack) => stack.id)) + 1
    : 1;

const manageSearchHistory = (city) => {
  // 최대 10개까지 저장
  historyStack.unshift({ id: nextId(), city });
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
  historyStack.slice(0, 4).forEach((stack) => {
    html += `
    <li>
      <div>${stack.city}</div>
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
  console.log(historyStack);
};

const getIconByWeatherId = (id) => {
  if (id >= 200 && id <= 232) return "fas fa-bolt";
  if (id >= 301 && id <= 321) return "fas fa-cloud-rain";
  if (id >= 500 && id <= 504) return "fas fa-cloud-sun-rain";
  if (id >= 511 && id <= 531) return "fas fa-cloud-showers-heavy";
  if (id === 511) return "fas fa-snowflake";
  if (id >= 600 && id <= 622) return "fas fa-snowflake";
  if (id >= 701 && id <= 781) return "fas fa-smog";
  if (id === 800) return "fas fa-sun";
  if (id === 801) return "fas fa-cloud-sun";
  if (id === 802 || id === 803 || id === 804) return "fas fa-cloud";
};

const render = (city) => {
  const { temp } = data.main;
  const [{ id, main }] = data.weather;
  console.log(id, getIconByWeatherId(id));
  const { hours, mins, day, date, moon } = getTime();
  weatherToday.innerHTML = `
    <div class="temperature">
      ${Math.round(temp)}°
    </div>
    <div>
      <div class="location-name">${city}</div>
      <div class="clock">
        ${hours}:${mins < 10 ? "0" + mins : mins} ${day} ${date} ${moon}
      </div>
    </div>
    <div class="weather">
      <i class="${getIconByWeatherId(id)} icon-weather"></i>
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
