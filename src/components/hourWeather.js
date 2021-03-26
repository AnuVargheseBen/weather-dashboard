import GridList from '@material-ui/core/GridList';
import GridTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import BeachAccessRoundedIcon from '@material-ui/icons/BeachAccessRounded';
import WbSunnycon from '@material-ui/icons/WbSunny';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'list-item',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '25px',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary,
  },
}));

function HourlyWeatherData({ weather }) {
  const classes = useStyles();

  const weatherData = weather.hour;
  const d = new Date();
  let hour = d.getHours();
  const currentWeather = weatherData.slice(hour, hour + 12);
  console.log('hours', currentWeather);
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={6} spacing={3}>
        {currentWeather.map((weather) => {
          return (
            <GridTile key={weather.id} className={classes.title}>
              <h1>{weather.time.split(' ')[1]}</h1>

              {weather.chance_of_rain === '0' ? (
                <h1>{<WbSunnycon />}</h1>
              ) : (
                <h1>
                  <BeachAccessRoundedIcon />
                </h1>
              )}
              <h1>
                {weather.temp_c}
                <span>&deg;C</span>
              </h1>
            </GridTile>
          );
        })}
      </GridList>
    </div>
  );
}

export default HourlyWeatherData;
