import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import routes from "./routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        {routes.map((route) => {
          const Page = route.component;
          return (
            <Route
              key={route.path}
              {...route.options}
              path={route.path}
              element={<Page />}
            ></Route>
          );
        })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
