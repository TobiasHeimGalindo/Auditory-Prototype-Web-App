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
    fontFamily: "Outfit Regular, sans-serif",
    h1: {
      fontFamily: "Outfit Bold, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Outfit Bold, sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "Outfit Bold, sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "Outfit Bold, sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Outfit Bold, sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Outfit Bold, sans-serif",
      fontWeight: 700,
    },
    body2: {
      fontFamily: "Outfit ExtraLight, sans-serif",
      fontWeight: 300,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          borderRadius: 45,
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
          "&:hover": {
            backgroundColor: "#FFD166",
          },
          "&:active": {
            backgroundColor: "#FFC045",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 45,
          minWidth: 230,
          fontSize: "1.5rem",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "17px",
          backgroundColor: "#FFB703",
          color: "#161713",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#FFD166",
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: "15px",
          cursor: "pointer",
        },
      },
    },
  },
};
