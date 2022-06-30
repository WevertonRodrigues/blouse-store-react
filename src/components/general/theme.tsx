import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "../../router";
import store from "../../store";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function Theme() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}
