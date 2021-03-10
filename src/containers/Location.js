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
      value: " ",
      weatherInfo: null,
      location: {},
      isLocation: false,
      latitude: null,
      longitude: null,
      currentLocation: {},
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

        const fetchLocationName = await axios
          .get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?${latitude}&${longitude}&localityLanguage=en`
          )
          .then((response) => {
            const city = response.data.city;
            this.setState({ value: city });
            return response.data;
          });

        this.setState({
          weatherInfo: weatherInfo.data,
          isLocation: true,
          currentLocation: fetchLocationName,
        });
      },

      (err) => console.log(err)
    );
  };

  handleClick = async () => {
    if (this.state.value.length > 1) {
      const geoAPI = `https://nominatim.openstreetmap.org/search?q=${this.state.value}&format=json&polygon=1&addressdetails=1`;
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
        this.setState({
          weatherInfo: weatherInfo.data,
          location: geoLocations.data[0].address,
          isLocation: true,
        });
        console.log("hi", weatherInfo);
      } else {
        this.setState({ isLocation: false });
      }
    } else {
      alert("Please enter a City");
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { country, city, boundary } = this.state.location;
    const { city: location } = this.state.currentLocation;

    const {
      temp,
      precip,
      snow,
      wind_spd: windSpeed,
      clouds,
      sunrise,
      sunset,
      timezone,
      country_code: countryCode,
    } = this.state.weatherInfo?.data[0] ?? {};

    const { description } = this.state.weatherInfo?.data[0]?.weather ?? {};

    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <h1 style={{ textAlign: "center", color: "blue" }}>
            Just a click!! Weather is here.
          </h1>
          <SearchBar
            value={this.state.value}
            placeholder="City/Country"
            onChange={(newValue) => this.setState({ value: newValue })}
            onRequestSearch={() => this.handleClick()}
          />
        </Grid>
        <Grid item xs={2}></Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          {this.state.weatherInfo && this.state.value ? (
            <LocationInfo
              className={classes.weather}
              country={country}
              countryCode={countryCode}
              city={city}
              location={location}
              boundary={boundary}
              timezone={timezone}
              temp={temp}
              description={description}
              isLocation={this.state.isLocation}
            />
          ) : (
            ""
          )}
        </Grid>

        <Grid item xs={4}>
          {this.state.weatherInfo && this.state.value ? (
            <Weather
              temp={temp}
              precip={precip}
              className={classes.weather}
              snow={snow}
              windSpeed={windSpeed}
              sunrise={sunrise}
              sunset={sunset}
              clouds={clouds}
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
