const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "bold" as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
};

export const mochaTheme = {
  ...baseTheme,
  colors: {
    background: "#1e1e2e",
    surface: "#313244",
    header: "#6c4ab6",
    card: "#45475a",
    text: {
      primary: "#cdd6f4",
      secondary: "#a6adc8",
      inverse: "#1e1e2e",
      white: "#ffffff",
    },
    primary: "#cba6f7",
    secondary: "#f38ba8",
    border: "#45475a",
    highlight: "#89b4fa",
    button: {
      primary: "#cba6f7",
      text: "#1e1e2e",
      border: "#838390",
    },
    success: "#a6e3a1",
    warning: "#f9e2af",
    error: "#f38ba8",
    info: "#89b4fa",
  },
};

export const latteTheme = {
  ...baseTheme,
  colors: {
    background: "#eff1f5",
    surface: "#e6e9ef",
    header: "#7287fd",
    card: "#ccd0da",
    text: {
      primary: "#4c4f69",
      secondary: "#6c6f85",
      inverse: "#eff1f5",
      white: "#000000",
    },
    primary: "#cba6f7",
    secondary: "#f38ba8",
    border: "#ccd0da",
    highlight: "#89b4fa",
    button: {
      primary: "#cba6f7",
      text: "#4c4f69",
      border: "#b4befe",
    },
    success: "#a6e3a1",
    warning: "#f9e2af",
    error: "#f38ba8",
    info: "#89b4fa",
  },
};
