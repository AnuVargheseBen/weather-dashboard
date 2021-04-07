import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  paper: {
    padding: theme.spacing(4),
  },
  textContainer: {
    margin: 10,
  },
}));

function Weather({ wind, snow, rain, sunrise, sunset, clouds, className }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={`${classes.root} ${className}`}>
        <List className='flexContainer'>
          <Grid container>
            <Grid xs={6}>
              <ListItem>
                <img src={process.env.PUBLIC_URL + '/images/wind.png'} width='20%' alt='wind' />
                <ListItemText
                  className={classes.textContainer}
                  primary='Wind'
                  secondary={`${wind}mph`}
                />
              </ListItem>
              <ListItem>
                <img
                  src={process.env.PUBLIC_URL + '/images/snowflake.png'}
                  width='20%'
                  alt='snow'
                />
                <ListItemText
                  className={classes.textContainer}
                  primary='Snow'
                  secondary={`${snow}%`}
                />
              </ListItem>
              <ListItem>
                <img src={process.env.PUBLIC_URL + '/images/rainy.png'} width='20%' alt='rain' />
                <ListItemText
                  className={classes.textContainer}
                  primary='Rain'
                  secondary={`${rain}%`}
                />
              </ListItem>
            </Grid>
            <Grid xs={6}>
              <ListItem>
                <img
                  src={process.env.PUBLIC_URL + '/images/sunrise.png'}
                  width='20%'
                  alt='sunrise'
                />
                <ListItemText
                  className={classes.textContainer}
                  primary='Sunrise'
                  secondary={`${sunrise}`}
                />
              </ListItem>
              <ListItem>
                <img src={process.env.PUBLIC_URL + '/images/sunset.png'} width='20%' alt='sunset' />
                <ListItemText
                  className={classes.textContainer}
                  primary='Sunset'
                  secondary={`${sunset}`}
                />
              </ListItem>
              <ListItem>
                <img src={process.env.PUBLIC_URL + '/images/clouds.png'} width='20%' alt='clouds' />
                <ListItemText
                  className={classes.textContainer}
                  primary='Clouds'
                  secondary={`${clouds}%`}
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </div>
    </React.Fragment>
  );
}
export default Weather;
