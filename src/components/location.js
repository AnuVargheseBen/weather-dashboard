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
  city,
  boundary,
  timezone,
  countryCode,
  country,
  temp,
  description,
  isLocation,
  location,
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

  return (
    <Container fixed className={classes.root}>
      {isLocation ? (
        <React.Fragment>
          <Typography variant="h4" align="start">
            {city}
            {location}
            {boundary} <LocationCityIcon />
          </Typography>
          <Typography variant="h4" align="start">
            {country}({countryCode})
          </Typography>
          <Typography variant="h4" align="start">
            {timezone}
          </Typography>
          <Typography variant="h4" align="start">
            {formatter.format(d)}
          </Typography>
          <Typography variant="h1" align="start">
            {temp}
            <span>&deg;C</span>
          </Typography>
          <Typography variant="h4" align="start">
            {description}
          </Typography>
        </React.Fragment>
      ) : (
        ""
      )}
    </Container>
  );
}
export default Location;
