// DOMs
const weatherToday = document.querySelector(".weather-today");

// variable
const API_KEY = "bbcad54aeb4d627c3798f0773d883830";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

let data = [];
let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let month = [
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
const getTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const mins = time.getMinutes();
  const day = week[time.getDay()];
  const date = time.getDate();
  const moon = month[time.getMonth()];
  return { hours, mins, day, date, moon };
};

const render = (city) => {
  const { temp } = data.main;
  const { hours, mins, day, date, moon } = getTime();
  weatherToday.innerHTML = `
    <div class="temperature">
      <span>${Math.round(temp)}</span>°
    </div>
    <div class="location">
      <div class="location-name">${city}</div>
      <div class="clock">
        ${hours}:${mins < 10 ? "0" + mins : mins} ${day} ${date} ${moon}
      </div>
    </div>
    <div class="state">
      <i class="icon-cloud"><i>
      <div class="weather-state">Sunny</div>
    </div>
  `;
  getTime();
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

// Event
window.addEventListener("load", () => getWeatherByCityName());
