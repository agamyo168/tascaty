import React, { createContext, useContext, useState } from "react";

export interface SnackbarOptions {
  duration?: number;
  backgroundColor?: string;
  textColor?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface SnackbarContextType {
  showSnackbar: (message: string, options?: SnackbarOptions) => void;
  hideSnackbar: () => void;
  isVisible: boolean;
  message: string;
  options: SnackbarOptions;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<SnackbarOptions>({
    duration: 3000,
    backgroundColor: "#cba6f7",
    textColor: "#1e1e2e",
  });

  const showSnackbar = (msg: string, opts: SnackbarOptions = {}) => {
    setMessage(msg);
    setOptions((prev) => ({ ...prev, ...opts }));
    setIsVisible(true);
  };

  const hideSnackbar = () => {
    setIsVisible(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar, hideSnackbar, isVisible, message, options }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
