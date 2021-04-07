import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';

import LocationInfo from '../components/location';
import Weather from '../components/weather';
import HourlyWeather from '../components/hourWeather';
import { getGeoLocation } from '../services/osmLocation';
import { getWeatherData } from '../services/weatherAPI';
import { getCurrentLocation } from '../services/currentLocationAPI';
import { getUpcoming24Hour } from '../utils/hourlyForecast';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
  },
  search: {
    margin: theme.spacing(4),
    width: '100%',
  },
  weather: {
    height: '100%',
    marginTop: '8px',
    padding: '30px',
  },
  gridList: {
    padding: '20px',
    margin: '15px',
  },
});

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ' ',
      locationName: null,
      weatherInfo: null,
      country: null,
      isLocationFound: false,
      currentLocation: {},
      isRequestState: false,
    };
  }

  componentDidMount = () => {
    this.currentLocation();
  };

  currentLocation = () => {
    return navigator.geolocation.getCurrentPosition(
      async (position) => {
        this.setState({ isRequestState: true });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const currentLocation = await getCurrentLocation(latitude, longitude);
        const weatherInfo = await getWeatherData(currentLocation.city);
        this.setState({ searchValue: currentLocation.city });

        const data = weatherInfo.data;
        const weather = weatherInfo.data.forecast.forecastday[0];
        const dateData = weatherInfo.data.location;
        const weatherDescription = weatherInfo.data.current.condition;
        const clouds = weatherInfo.data.current;

        this.setState({
          weatherInfo: {
            tempDegree: weather.day.avgtemp_c,
            tempFahren: weather.day.avgtemp_f,
            clouds: clouds.cloud,
            snow: weather.day.daily_chance_of_snow,
            rain: weather.day.daily_chance_of_rain,
            sunrise: weather.astro.sunrise,
            sunset: weather.astro.sunset,
            wind: weather.day.maxwind_mph,
            localTime: dateData.localtime,
            data,
            description: weatherDescription.text,
            icon: weatherDescription.icon,
            weather,
          },
          country: {
            country: currentLocation.countryName,
            countryCode: currentLocation.countryCode,
            timeZone: weather.timezone,
          },
          isLocationFound: true,
          locationName: { city: currentLocation.city },
          isRequestState: false,
        });
      },

      (err) => console.log(err)
    );
  };

  renderData = async (geoLocations) => {
    const weatherInfo = await getWeatherData(this.state.searchValue);

    const data = weatherInfo.data;
    const location = geoLocations.data[0].address;
    const weather = weatherInfo.data.forecast.forecastday[0];
    const clouds = weatherInfo.data.current;
    const weatherDescription = weatherInfo.data.current.condition;
    const timeZone = weatherInfo.data.location;
    const dateData = weatherInfo.data.location;
    console.log({ data });

    this.setState({
      weatherInfo: {
        tempDegree: weather.day.avgtemp_c,
        tempFahren: weather.day.avgtemp_f,
        clouds: clouds.cloud,
        snow: weather.day.daily_chance_of_snow,
        rain: weather.day.daily_chance_of_rain,
        sunrise: weather.astro.sunrise,
        sunset: weather.astro.sunset,
        wind: weather.day.maxwind_mph,
        description: weatherDescription.text,
        icon: weatherDescription.icon,
        localTime: dateData.localtime,
        weather,
        data: data,
      },
      country: {
        country: location.country,
        countryCode: location.country_code,
        timeZone: timeZone.tz_id,
      },
      locationName: { city: location.city },
      isLocationFound: true,
      isRequestState: false,
    });
  };

  handleClick = async () => {
    if (this.state.searchValue.length > 1) {
      this.setState({ isRequestState: true });
      const geoLocations = await getGeoLocation(this.state.searchValue);

      if (geoLocations.data.length > 0) {
        this.renderData(geoLocations);
      } else {
        this.setState({
          isLocationFound: false,
          isRequestState: false,
          weatherInfo: null,
        });
      }
    } else {
      alert('Please enter a City');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <h1 style={{ textAlign: 'center' }}>JUST A CLICK!! WEATHER IS HERE.</h1>
            <SearchBar
              value={this.state.searchValue}
              placeholder='City/Country'
              onChange={(newValue) =>
                this.setState({
                  searchValue: newValue,
                  weatherInfo: null,
                  isLocationFound: true,
                })
              }
              onRequestSearch={() => this.handleClick()}
            />
            {this.state.isRequestState && <LinearProgress color='primary' />}
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            {this.state.weatherInfo && (
              <LocationInfo
                country={this.state.country}
                locationName={this.state.locationName}
                weatherInfo={this.state.weatherInfo}
              />
            )}

            {!this.state.isLocationFound && !this.state.weatherInfo && (
              <div style={{ textAlign: 'start', fontSize: 'x-large' }}>
                Please Enter a valid City/Location.
              </div>
            )}
          </Grid>

          <Grid item xs={4}>
            {this.state.weatherInfo && (
              <Weather {...this.state.weatherInfo} className={classes.weather} />
            )}
          </Grid>
        </Grid>
        <div className={classes.gridList}>
          {this.state.weatherInfo && (
            <HourlyWeather
              hourly={getUpcoming24Hour(this.state.weatherInfo.data)}
              className={classes.gridList}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Location);
