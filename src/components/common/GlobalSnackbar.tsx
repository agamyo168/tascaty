import { useSnackbar } from "@/src/hooks/useSnackbar";
import React from "react";
import Snackbar from "./Snackbar";

const GlobalSnackbar: React.FC = () => {
  const { isVisible, hideSnackbar, message, options } = useSnackbar();

  return (
    <Snackbar
      visible={isVisible}
      onDismiss={hideSnackbar}
      message={message}
      duration={options.duration}
      backgroundColor={options.backgroundColor}
      textColor={options.textColor}
      action={options.action}
    />
  );
};

export default GlobalSnackbar;
