import "./App.css";
import { RouteObject, useRoutes } from "react-router-dom";
import { Sidebar, Toolbar } from "./components";
import { Box } from "@mui/system";
import ToolbarMui from "@mui/material/Toolbar";
import { useAuth } from "./hooks";
import { CssBaseline } from "@mui/material";
import routes, { SourceRoute, middlewares } from "./router/routes";

function normalizeRoutes(routes: SourceRoute[]): RouteObject[] {
  return routes.map((route) => {
    const Middleware = route?.middleware && middlewares?.[route?.middleware];
    const Page = route.component && <route.component />;

    const element = Middleware && Page ? <Middleware children={Page} /> : Page;

    return {
      path: route.path,
      element: element,
      children: normalizeRoutes(route?.children ?? []),
      index: route.index,
    };
  });
}

function App() {
  const { isLogged } = useAuth();

  let root = useRoutes(normalizeRoutes(routes));

  return (
    <div className="App">
      <CssBaseline />
      <Toolbar />
      <Sidebar />
      <Box
        component="main"
        height="100%"
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        {isLogged && <ToolbarMui></ToolbarMui>}
        {root}
      </Box>
    </div>
  );
}

export default App;
