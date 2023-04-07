import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AudioProvider } from "./AudioContext";
import { themeOptions } from "../src/styles/theme.ts";
import App from "./App";

const theme = createTheme(themeOptions);

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </ThemeProvider>
  );
};

export default Root;