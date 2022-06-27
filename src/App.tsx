import "./App.css";
import { Outlet } from "react-router-dom";
import { Sidebar, Toolbar } from "./components";
import { Box } from "@mui/system";
import ToolbarMui from "@mui/material/Toolbar";
import { useAuth } from "./hooks";
import { CssBaseline } from "@mui/material";

function App() {
  const { isLogged } = useAuth();

  return (
    <div className="App">
      <CssBaseline />
      <Toolbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLogged && <ToolbarMui></ToolbarMui>}
        <Outlet />
      </Box>
    </div>
  );
}

export default App;
