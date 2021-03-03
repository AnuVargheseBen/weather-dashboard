import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AcUnitTwoToneIcon from "@material-ui/icons/AcUnitTwoTone";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Grid } from "@material-ui/core";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import WbSunnycon from '@material-ui/icons/WbSunny';
import CloudRoundedIcon from '@material-ui/icons/CloudRounded';
import BeachAccessRoundedIcon from '@material-ui/icons/BeachAccessRounded';
import WavesRoundedIcon from '@material-ui/icons/WavesRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

function Weather({
  precip,
  className,
  snow,
  windSpeed,
  sunrise,
  sunset,
  clouds,
}) {
  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} ${className}`}>
      <List className="flexContainer">
        <Grid container>
          <Grid xs={6}>
            <ListItem>
                <ListItemIcon>
               <WavesRoundedIcon/>
                </ListItemIcon>
              <ListItemText
                primary="Wind"
                secondary={`${windSpeed.toFixed(2)}mph`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AcUnitTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Snow" secondary={`${snow}%`} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <BeachAccessRoundedIcon/>
                </ListItemIcon>
              <ListItemText primary="Rain" secondary={`${precip}%`} />
            </ListItem>
          </Grid>

          <Grid xs={6}>
            <ListItem>
                <ListItemIcon>
                <WbSunnycon/>
                </ListItemIcon>
              <ListItemText primary="Sunrise" secondary={`${sunrise}AM`} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Brightness4Icon/>
                </ListItemIcon>
              <ListItemText primary="Sunset" secondary={`${sunset}PM`} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <CloudRoundedIcon/>
                </ListItemIcon>
              <ListItemText primary="Clouds" secondary={`${clouds}%`} />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </Paper>
  );
}
export default Weather;
