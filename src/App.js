import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Weather from "./containers/Location";
const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
      <Weather/>
  </ThemeProvider>
);
export default App;

