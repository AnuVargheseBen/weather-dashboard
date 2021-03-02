import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "right",
  },
}));

function Location({ location, timezone, className,datetime }) {
  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} ${className}`}>
      <Typography variant="h6" align="right">
        {location} <LocationCityIcon />
      </Typography>
      <Typography variant="h6"  align="right">Timezone: {timezone}</Typography>
      <Typography variant="h6"  align="right">{datetime}</Typography>
    </Paper>
  );
}
export default Location;
