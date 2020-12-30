/* eslint-disable no-use-before-define */
// DOMs
const wrapper = document.querySelector(".wrapper");
const weatherToday = document.querySelector(".weather-today");
const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const histories = document.querySelector(".history");
const weatherDetail = document.querySelector(".detail-state");
const weatherWeek = document.querySelector(".week-state");

// variable
const API_KEY = "bbcad54aeb4d627c3798f0773d883830";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
let cityName = "Seoul";
let datas = [];
let dailyDatas = [];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
let historyStack = [];

const getTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const mins = time.getMinutes();
  const day = days[time.getDay()];
  const date = time.getDate();
  const moon = month[time.getMonth()];
  const sec = time.getSeconds();

  const clock = document.querySelector(".clock");
  clock.innerHTML = `${hours}:${
    mins < 10 ? "0" + mins : mins
  } ${day} ${date} ${moon}`;
  return { hours, mins, day, date, moon, sec };
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

const getBackgroundByWeatherId = (id) => {
  let state = "";
  if (id >= 200 && id <= 232) state = "thunderstorm";
  if (id >= 301 && id <= 321) state = "drizzle";
  if (id >= 500 && id <= 504) state = "rain";
  if (id >= 511 && id <= 531) state = "rain";
  if (id === 511) state = "snowy";
  if (id >= 600 && id <= 622) state = "snowy";
  if (id >= 701 && id <= 781) state = "haze";
  if (id === 800) state = "bluesky";
  if (id === 801) state = "snatches-of-clouds";
  if (id === 802 || id === 803 || id === 804) state = "overcast";
  wrapper.style.background = `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), no-repeat center/cover url(https://source.unsplash.com/1600x900/?${state})`;
};

// eslint-disable-next-line no-confusing-arrow
const nextId = () =>
  historyStack.length
    ? Math.max(...historyStack.map((stack) => stack.id)) + 1
    : 0;

const removeHistory = (e) => {
  if (e.target.matches(".history > li")) return;
  console.log("remove history");
  historyStack = historyStack.filter(
    (stack) => stack.id !== +e.target.parentNode.id
  );
  localStorage.setItem("history stack", JSON.stringify(historyStack));
  renderHistory();
};

const manageSearchHistory = (city) => {
  historyStack = historyStack.filter((stack) => stack.city !== city);
  historyStack.unshift({ id: nextId(), city });
  if (historyStack.length > 10) {
    historyStack.pop();
  }
  localStorage.setItem("history stack", JSON.stringify(historyStack));
  renderHistory();
};

const controlToFetchData = async (city) => {
  if (city === cityName) return;
  localStorage.setItem("city", JSON.stringify(city));
  cityName = city;
  manageSearchHistory(city);
  await getWeatherByCityName(city);
  const { lat, lon } = await datas.coord;
  await getDailyWeatherByCoord(lat, lon);
};

const capitalizeCityName = (city) => {
  const splitCity = city.split(" ");
  const capitalize = splitCity
    .map((word) =>
      [...word].map((char, i) => (i === 0 ? char.toUpperCase() : char)).join("")
    )
    .join(" ");
  console.log("capitalize:", capitalize);
  return capitalize;
};

const searchLocation = (e) => {
  console.log("search location");
  e.preventDefault();
  const { value } = searchInput;
  const location = value.trim();
  if (location === "") return;
  controlToFetchData(capitalizeCityName(location));
  e.target.reset();
};

const searchHistory = (e) => {
  e.preventDefault();
  if (e.target.matches(".remove-history") || e.target.matches("i")) return;
  console.log("search history");
  const value = e.target.textContent.trim();
  controlToFetchData(value);
};

const renderDailyWeather = () => {
  const isDailyData = dailyDatas.map((d) => d.weather[0].main).slice(0, 6);
  const today = new Date();
  let html = "";
  isDailyData.forEach(
    (dailyWeather, i) =>
      (html += `
        <li class="day">
          <div>${days[(today.getDay() + i + 1) % 7]}</div>
          <div class="daily-weather">${dailyWeather}</div>
        </li>`)
  );
  weatherWeek.innerHTML = html;
};

const renderDetail = () => {
  const { all } = datas.clouds;
  const { humidity } = datas.main;
  const { speed } = datas.wind;
  const html = `
    <li class="item">
      <div>Cloudy</div>
      <div>${all}%</div>
    </li>
    <li class="item">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </li>
    <li class="item">
      <div>Wind</div>
      <div>${speed}km/h</div>
    </li>
    <li class="item">
      <div>Rain</div>
      <div>${datas.rain?.["1h"] ?? 0}mm</div>
    </li> 
  `;
  weatherDetail.innerHTML = html;
};

const renderHistory = () => {
  console.log("render History");
  let html = "";
  historyStack.slice(0, 4).forEach((stack) => {
    html += `
    <li id="${stack.id}">
      <div>${stack.city}</div>
      <i class="fas fa-times remove-history"></i>
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
  const { temp } = datas.main;
  const [{ id, main }] = datas.weather;
  const { hours, mins, day, date, moon } = getTime();
  const html = `
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
      <div class="weather-state">${
        main !== "Thunderstorm" ? main : "Thunder"
      }</div>
    </div>
  `;
  weatherToday.innerHTML = html;
  searchInput.focus();
  getBackgroundByWeatherId(id);
};

const getWeatherByCityName = async (city = "Seoul") => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const result = await response.json();
  datas = await result;
  render(city);
  renderHistory();
  renderDetail();
};

const getDailyWeatherByCoord = async (lat = 37.57, lon = 126.98) => {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const result = await response.json();
  dailyDatas = await result.daily;
  renderDailyWeather();
};

const init = async () => {
  cityName = JSON.parse(localStorage.getItem("city")) || "Seoul";
  historyStack = JSON.parse(localStorage.getItem("history stack")) || [
    { id: nextId(), city: cityName },
  ];
  await getWeatherByCityName(cityName);
  const { lat, lon } = await datas.coord;
  getDailyWeatherByCoord(lat, lon);
  setInterval(getTime, 1000);
};

// setInterval(init, 1.8e6);
// event
window.addEventListener("load", init);
form.addEventListener("submit", searchLocation);
searchBtn.addEventListener("click", () => {
  searchInput.focus();
});
