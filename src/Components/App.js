import React from "react";
import { ThemeProvider } from "styled-components";
import GolobalStyles from "../Styles/GolobalStyles";
import Theme from "../Styles/Theme";
export default () => (
  <ThemeProvider theme={Theme}>
    <GolobalStyles />
    hello
  </ThemeProvider>
);
