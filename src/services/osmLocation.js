import axios from "axios";

async function getGeoLocation(locationName){
    const geoAPI = `https://nominatim.openstreetmap.org/search?q=${locationName}&format=json&polygon=1&addressdetails=1`;
      const geoLocations = await axios.get(geoAPI);
     return geoLocations;
}
export {getGeoLocation};