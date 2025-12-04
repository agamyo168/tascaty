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
      secondary: "#bac2de",
      inverse: "#fff",
    },
    primary: "#cba6f7",
    secondary: "#f38ba8",
    border: "#9399b2",
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
      secondary: "#5c5f77",

      inverse: "#eff1f5",
    },
    primary: "#cba6f7",
    secondary: "#f38ba8",
    border: "#7c7f93",
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
