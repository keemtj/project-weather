const API_KEY = "bbcad54aeb4d627c3798f0773d883830";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getCityName = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  const { weather, main, wind, clouds, name } = await data;
  console.log(weather, main, wind, clouds, name);
};

// const getWeatherData = async () => {
//   const response = await fetch(
//     `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
//   );
//   console.log(response, "get it~~~~~~~~");
// };

getCityName("seoul");
