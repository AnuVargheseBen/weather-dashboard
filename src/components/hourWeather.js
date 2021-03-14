import GridList from "@material-ui/core/GridList";
import GridTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "list-item",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "25px",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
}));

function HourlyWeatherData({ weather }) {
  const classes = useStyles();
  console.log("hr", weather.hour);
  const weatherData = weather.hour;
  var d = new Date();
  var hour = d.getHours();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={6} spacing={3}>
        {
          weatherData.filter(
            (weather) => weather.time.split(" ").splice(1, 1) === hour
          )
          
          //   .map((filteredTime) => (
          //     <GridTile key={weather.id} className={classes.title}>
          //       <h1>{filteredTime}</h1>
          //     </GridTile>
          //   ))}
        }
      </GridList>
    </div>
  );
}

export default HourlyWeatherData;
