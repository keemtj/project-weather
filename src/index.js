const API_KEY = "bbcad54aeb4d627c3798f0773d883830";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherByCityName = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const getWeatherWeek = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  console.log("weeeeeek~", data);
  return data;
};
