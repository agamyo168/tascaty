import React from "react";
import { Text } from "react-native";
import { Snackbar as PaperSnackbar } from "react-native-paper";

interface SnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  duration?: number;
  backgroundColor?: string;
  textColor?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  onDismiss,
  message,
  duration = 3000,
  backgroundColor = "#cba6f7",
  textColor = "#1e1e2e",
  action,
}) => {
  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={{ backgroundColor }}
      action={
        action
          ? {
              label: action.label,
              onPress: action.onPress,
              labelStyle: { color: textColor, fontWeight: "bold" },
            }
          : undefined
      }
    >
      <Text style={{ color: textColor }}>{message}</Text>
    </PaperSnackbar>
  );
};

export default Snackbar;
