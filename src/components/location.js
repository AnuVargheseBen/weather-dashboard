import React from "react";
import Typography from "@material-ui/core/Typography";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "30px",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "start",
  },
}));

function Location({
  locationName,
  country,
  weatherInfo,
  isLocation,
}) {
  const classes = useStyles();
  const d = new Date();

  const formatter = Intl.DateTimeFormat(
    "default", // a locale name; "default" chooses automatically
    {
      weekday: "short",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
console.log('t/F',isLocation)
  return (
    <React.Fragment>
      {isLocation ? (
        <Container fixed className={classes.root}>
          <Typography variant="h4" align="start">
            {locationName.city} <LocationCityIcon />
          </Typography>
          <Typography variant="h4" align="start">
            {country.country}({country.countryCode})
          </Typography>
          <Typography variant="h4" align="start">
            { country.timeZone}
          </Typography>
          <Typography variant="h4" align="start">
            {formatter.format(d)}
          </Typography>
          <Typography variant="h1" align="start">
            {weatherInfo.temp}
            <span>&deg;C</span>
          </Typography>
          <Typography variant="h4" align="start">
            {weatherInfo.description}
          </Typography>
        </Container>
      ) : (
        <h1 style={{textAlign:"start"}}>Please Enter a Location or City</h1>
      )}
    </React.Fragment>
  );
}
export default Location;
