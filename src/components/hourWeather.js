import GridList from '@material-ui/core/GridList';
import GridTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#fafafa',
    borderRadius: '25px',
    marginRight: '10%',
    marginLeft: '10%',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary,
  },
}));

function HourlyWeatherData({ hourly }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={14} spacing={3}>
        {hourly.map((hours, index) => {
          return (
            <GridTile key={index} className={classes.title}>
              <h2>{hours.timeObj.format('HH:mm')}</h2>
              {hours.type === 'Sunset' || hours.type === 'Sunrise' ? (
                <h2>
                  <img src={hours.icon} alt='icon' width='50%' />
                </h2>
              ) : (
                <h2>
                  <img src={hours?.condition?.icon} alt='icon' width='50%' />
                </h2>
              )}

              {hours.temp_c ? (
                <h2>
                  {hours.temp_c}
                  <span>&deg;C</span>
                </h2>
              ) : (
                <h2>{hours.type}</h2>
              )}
            </GridTile>
          );
        })}
      </GridList>
    </div>
  );
}

export default HourlyWeatherData;
