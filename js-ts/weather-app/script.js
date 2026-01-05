const getWeatherBtnEl = document.getElementById("get-weather-btn");
const weatherCardEl = document.getElementById("weather-card");
const weatherIconEl = document.getElementById("weather-icon");
const tempEl = document.getElementById("main-temperature");
const feelsEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const windGustEl = document.getElementById("wind-gust");
const selectEl = document.getElementById("location-dropdown");
const mainEl = document.getElementById("weather-main");
const locationEl = document.getElementById("location");

const getWeather = async (city) => {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    if (!response.ok) {
      alert("Something went wrong, please try again later");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const showWeather = async (city) => {
  const { main, name, weather, wind } = await getWeather(city);

  weatherCardEl.style.display = "flex";

  weatherIconEl.setAttribute("src", weather[0].icon || "");
  tempEl.innerHTML = main?.temp ? `${main.temp} &deg; C` : "N/A";
  mainEl.innerHTML = weather[0].main ? weather[0].main : "N/A";
  feelsEl.innerHTML = `Feels Like: ${main?.feels_like ? main.feels_like + "&deg; C" : "N/A"}`;
  humidityEl.innerHTML = `Humidity: ${main?.humidity ? main.humidity + "%" : "N/A"}`;
  windEl.innerHTML = `Wind: ${wind?.speed ? wind.speed + "m/s" : "N/A"}`;
  windGustEl.innerHTML = `Gusts: ${wind?.gust ? wind.gust + "m/s" : "N/A"}`;
  locationEl.innerHTML = name || "N/A";
};

getWeatherBtnEl.addEventListener("click", () => {
  if (selectEl.value) {
    showWeather(selectEl.value);
  } else {
    alert("Select city");
  }
});
