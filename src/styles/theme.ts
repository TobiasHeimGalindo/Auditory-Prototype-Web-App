import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#FFB703",
    },
    secondary: {
      main: "#9c27b0",
    },
    text: {
      primary: "#161713",
    },
  },
  typography: {
    fontSize: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          borderRadius: "45px",
          minWidth: "171px",
          minHeight: "67px",
          padding: "12px 24px",
          fontFamily: "Outfit Regular",
          fontSize: "1.5rem",
          textTransform: "none",
        },
        outlined: {
          color: "#161713",
        },
        containedPrimary: {
          boxShadow: "0px 8px 15px 0px rgba(255, 183, 3, 0.5)",
        },
      },
    },
  },
};