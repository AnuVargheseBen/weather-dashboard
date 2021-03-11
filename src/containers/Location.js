import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";
import axios from "axios";

import LocationInfo from "../components/location";
import Weather from "../components/weather";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    margin: theme.spacing(4),
    width: "100%",
  },
  weather: {
    height: "100%",
    marginTop: "8px",
    padding: "30px",
  },
});

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: " ",
      locationName: null,
      weatherInfo: null,
      country: null,
      isLocation: false,
      currentLocation: {},
      isRequestState: null,
    };
  }

  componentDidMount = () => {
    this.currentLocation();
  };

  currentLocation = () => {
    return navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const options = {
          method: "GET",
          url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
          params: {
            lat: latitude,
            lon: longitude,
            units: "metric",
            lang: "en",
          },
          headers: {
            "x-rapidapi-key":
              "d40a5a4e25msh51b583d958830adp15929cjsn2c57ecc05088",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
          },
        };
        const weatherInfo = await axios.request(options);
        console.log("weather", weatherInfo);

        const currentLocation = await axios
          .get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?${latitude}&${longitude}&localityLanguage=en`
          )
          .then((response) => {
            const city = response.data.city;
            this.setState({ searchValue: city });
            return response.data;
          });
        console.log("location", currentLocation);

        const weather = weatherInfo.data.data[0];
        const weatherDescription = weather.weather;

        this.setState({
          weatherInfo: {
            temp: weather.app_temp,
            clouds: weather.clouds,
            snow: weather.snow,
            rain: weather.precip,
            sunrise: weather.sunrise,
            sunset: weather.sunset,
            wind: weather.wind_spd,
            description: weatherDescription.description,
          },
          country: {
            country: currentLocation.countryName,
            countryCode: currentLocation.countryCode,
            timeZone: weather.timezone,
          },
          isLocation: true,
          locationName: { city: currentLocation.city },
        });
      },

      (err) => console.log(err)
    );
  };

  handleClick = async () => {
    if (this.state.searchValue.length > 1) {
      const geoAPI = `https://nominatim.openstreetmap.org/search?q=${this.state.searchValue}&format=json&polygon=1&addressdetails=1`;
      const geoLocations = await axios.get(geoAPI);
      console.log("loc", geoLocations.data);

      if (geoLocations.data.length > 0) {
        const options = {
          method: "GET",
          url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
          params: {
            lat: geoLocations.data[0].lat,
            lon: geoLocations.data[0].lon,
            units: "metric",
            lang: "en",
          },
          headers: {
            "x-rapidapi-key":
              "d40a5a4e25msh51b583d958830adp15929cjsn2c57ecc05088",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
          },
        };

        const weatherInfo = await axios.request(options);
        console.log("hi", weatherInfo.data);
        const location = geoLocations.data[0].address;
        const weather = weatherInfo.data.data[0];
        // console.log('hell',weather);
        const weatherDescription = weather.weather;
        // console.log('des',weatherDescription);
        this.setState({
          weatherInfo: {
            temp: weather.app_temp,
            clouds: weather.clouds,
            snow: weather.snow,
            rain: weather.precip,
            sunrise: weather.sunrise,
            sunset: weather.sunset,
            wind: weather.wind_spd,
            description: weatherDescription.description,
          },
          country: {
            country: location.country,
            countryCode: location.country_code,
            timeZone: weather.timezone,
          },
          locationName: { city: location.city || location.boundary },
          isLocation: true,
        });
      } else {
        this.setState({ isLocation: false});
      }
    } else {
      alert("Please enter a City");
    }
    // this.setState({weatherInfo:null})
  };

  render() {
    const { classes } = this.props;
    console.log("bool", this.state.isLocation);
    console.log("wthr", this.state.weatherInfo);
    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <h1 style={{ textAlign: "center", color: "blue" }}>
            Just a click!! Weather is here.
          </h1>
          <SearchBar
            value={this.state.searchValue}
            placeholder="City/Country"
            onChange={(newValue) =>
              this.setState({
                searchValue: newValue,
                weatherInfo: null,
                isLocation: false,
              })
            }
            onRequestSearch={() => this.handleClick()}
          />
        </Grid>
        <Grid item xs={2}></Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          {this.state.weatherInfo && this.state.searchValue ? (
            <LocationInfo
              country={this.state.country}
              locationName={this.state.locationName}
              weatherInfo={this.state.weatherInfo}
              isLocation={this.state.isLocation}
            />
          ) : (
            <LocationInfo isLocation={this.state.isLocation}/>
          )}
        </Grid>

        <Grid item xs={4}>
          {this.state.weatherInfo && this.state.searchValue ? (
            <Weather
              weatherInfo={this.state.weatherInfo}
              className={classes.weather}
              isLocation={this.state.isLocation}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Location);
