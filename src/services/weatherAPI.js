import axios from "axios";

async function getWeatherData(locationName) {

  const options = {
    method: "GET",
    url: `https://api.weatherapi.com/v1/forecast.json?key=6124b5ab6dd44fdcb3b84806211203&q=${locationName}&days=5&aqi=no&alerts=no`,
    
  };

  const weatherInfo = await axios.request(options);
  return weatherInfo;
}

export { getWeatherData };
