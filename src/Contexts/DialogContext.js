import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const useDialog = () => {
  return useContext(DialogContext);
};

export const DialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const value = {
    dialogOpen,
    setDialogOpen,
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};
