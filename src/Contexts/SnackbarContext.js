import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // snackbarTimeout & shouldRenderSnackbar states to mock a delayed notification
  const [snackbarTimeout, setSnackbarTimeout] = useState(0);
  const [shouldRenderSnackbar, setShouldRenderSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    message: "",
    details: "",
  });

  const value = {
    snackbarOpen,
    setSnackbarOpen,
    snackbarContent,
    setSnackbarContent,
    snackbarTimeout,
    setSnackbarTimeout,
    shouldRenderSnackbar,
    setShouldRenderSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
