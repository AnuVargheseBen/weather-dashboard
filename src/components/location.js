import React from 'react';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '30px',
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'start',
  },
}));

function Location({ locationName, country, weatherInfo }) {
  const classes = useStyles();
  const dateObjDay = moment(weatherInfo.localTime).format('dddd Do MMMM YYYY');
  const dateObjTime = moment(weatherInfo.localTime).format('HH:mm a');

  return (
    <Container fixed className={classes.root}>
      <Typography variant='h4' align='start'>
        {locationName.city} <LocationCityIcon />
      </Typography>
      <Typography variant='h4' align='start'>
        {country.country}({country.countryCode})
      </Typography>
      <Typography variant='h4' align='start'>
        {country.timeZone}
      </Typography>
      <Typography variant='h4' align='start'>
        {dateObjDay}
      </Typography>
      <Typography variant='h4' align='start'>
        {dateObjTime}
      </Typography>
      <Typography variant='h1' align='start'>
        {weatherInfo.tempDegree}
        <span>&deg;C</span>
      </Typography>
      <Typography variant='h4' align='start'>
        {weatherInfo.description}
      </Typography>
      <Typography variant='h4' align='start'>
        <img src={weatherInfo.icon} alt='icon' />
      </Typography>
    </Container>
  );
}
export default Location;
