import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../general/theme";
import React from "react";

export default function ThemeSwitcher() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
