import axios from "axios";

async function getCurrentLocation(lat, lon) {
  const currentLocation = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${lat}&${lon}&localityLanguage=en`
  );
  return currentLocation.data;
}

export { getCurrentLocation };
