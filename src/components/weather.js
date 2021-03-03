import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

function Weather({
  temp,
  precip,
  className,
  snow,
  windSpeed,
  sunrise,
  sunset,
}) {
  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} ${className}`}>
      <Typography variant="h6" align="left">
        Wind Speed: {windSpeed}mph
      </Typography>
      <Typography variant="h6" align="left">
        Sunrise: {sunrise}AM
      </Typography>
      <Typography variant="h6" align="left">
        Sunset: {sunset}PM
      </Typography>
      <Typography variant="h6" align="right">
        {temp}
        <span>&deg;F</span>
      </Typography>
      <Typography variant="h6" align="right">
        Precipitations: {precip}%
      </Typography>
      <Typography variant="h6" align="right">
        Chance of Snow: {snow}%
      </Typography>
    </Paper>
  );
}
export default Weather;
